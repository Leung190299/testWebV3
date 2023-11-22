import clsx from 'clsx';
import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';
import { DMSansVN, Itel } from './_app';

export default function Document(props: DocumentProps) {
  return (
    <Html lang={'vi'} className="theme-light">
      <Head />
      <body className={clsx(DMSansVN.variable, Itel.variable, 'font-sans')}>
        <Main />
        <NextScript />
        <div id="__settings" />
        <div id="__tooltip" />
        <div id="__modals" />
        <div id="__loading" />
        <script type="text/javascript" dangerouslySetInnerHTML={{__html:'!(function (e, t, n, s, a, c, i) { (e.CSLiveChatWidget = a), (e[a] = e[a] || function () { (e[a].q = e[a].q || []).push(arguments); }), (e[a].l = 1 * new Date()), (c = t.createElement(n)), (i = t.getElementsByTagName(n)[0]), (c.async = 1), (c.src = s), i.parentNode.insertBefore(c, i); })( window, document, "script", "https://webchat.caresoft.vn:8091/widget/widget.min.js?v=1.0", "cslw" ); cslw("create", { domain: "iTelecom", domainId: 9241 })'}} />
      </body>
    </Html>
  );
}
