import * as PDFJS from 'pdfjs-dist';
import { FC, useEffect, useRef } from 'react';
import { Props } from '.';

export const ViewPDF: FC<Props> = ({ data, className, scale = 1, children }) => {
  const pageRenderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window != 'undefined') {
      PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;
      //@ts-ignore
    }
    showPDFInCanvas(data);
  }, [data]);

  const showPDFInCanvas = async (data: string) => {
    const loadPDF = PDFJS.getDocument({ data: atob(data) });
    loadPDF.promise
      .then(async (pdf) => {
        let container = document.querySelector('#boxPdf');
        if (container) {
          container.innerHTML=''
          let totalPage = pdf._pdfInfo.numPages;
          if (totalPage > 0)
            for (let index = 1; index <= totalPage; index++) {
              // fetchPageNo(index, pdf, container);
              await pdf.getPage(index).then(async (page) => {
                const viewport = page.getViewport({ scale: innerWidth < 768 ? 0.5 : scale });

                let canvasInHTML: { canvas?: HTMLCanvasElement; ctx?: any } = {
                  canvas: undefined,
                  ctx: undefined
                };

                const li = document.createElement('div');
                li.setAttribute('id', 'page-' + page._pageIndex);
                li.setAttribute('style', 'position: relative; width:100%');

                canvasInHTML.canvas = document.createElement('canvas');
                canvasInHTML.ctx = canvasInHTML.canvas.getContext('2d');
                canvasInHTML.canvas.height = viewport.height;
                canvasInHTML.canvas.width = viewport.width;

                li.appendChild(canvasInHTML.canvas);
                container && container.appendChild(li);

                const renderContext = {
                  canvasContext: canvasInHTML.ctx,
                  viewport
                };

                page.render(renderContext);


              });
            }
        }
      })
      .catch((error) => console.log(error));
  };



  return (
    <div className={className} id="boxPdf" ref={pageRenderRef}>
      {children}
    </div>
  );
};
