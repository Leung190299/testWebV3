import routes from '@/routes';
import { useRouter } from 'next/router';

type props = {
	type: 'all' | 'business' | 'Searchbox' | 'Breadcrumb';
	page?: string[];
};
const Schema = ({ type , page}: props) => {
  const router = useRouter();

	const getlinkURL = (index: number) => {

    return router.asPath
      .split('/')
      .filter((text) => text != '')
      .reduce((link, text, ind) => {
        if (ind > index) return link;
        link += `/${text}`;
        return link;
      }, 'https://v3.itel.vn');
  };

  switch (type) {
    case 'all':
      return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
				"@context": "https://schema.org",
				"@type": "Organization",
				"name": "Mạng di động iTel",
				"alternateName": "iTel",
				"url": "https://v3.itel.vn/",
				"logo": "https://v3.itel.vn/logo/logo-color.svg",
				"contactPoint": {
				  "@type": "ContactPoint",
				  "telephone": "0877087087",
				  "contactType": "customer service",
				  "contactOption": "TollFree",
				  "areaServed": "VN",
				  "availableLanguage": "Vietnamese"
				},
				"sameAs": [
				  "https://m.me/itel.fan",
				  "https://www.instagram.com/itel.vn/",
				  "https://v3.itel.vn/"
				]
			  }`
          }}
        />
      );

    case 'business':
      return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
				"@context": "https://schema.org",
				"@type": "LocalBusiness",
				"name": "Mạng di động iTel",
				"image": "https://v3.itel.vn/logo/logo-color.svg",
				"@id": "https://v3.itel.vn/#website",
				"url": "https://v3.itel.vn/",
				"telephone": "0877087087",
				"priceRange": "10000",
				"address": {
					"@type": "PostalAddress",
					"streetAddress": "B018 Tháp, The Manor - Hà Nội, Nam Từ Liêm, Hà Nội 10000, Việt Nam",
					"addressLocality": "Hà Nội",
					"postalCode": "10000",
					"addressCountry": "VN"
				},
				"geo": {
					"@type": "GeoCoordinates",
					"latitude": 21.0141166,
					"longitude": 105.7757575
				},
				"openingHoursSpecification": {
					"@type": "OpeningHoursSpecification",
					"dayOfWeek": [
						"Monday",
						"Tuesday",
						"Wednesday",
						"Thursday",
						"Friday"
					],
					"opens": "08:00",
					"closes": "17:30"
				},
				"sameAs": [
					"https://m.me/itel.fan",
					"https://www.instagram.com/itel.vn/",
					"https://v3.itel.vn/"
				]
			}`
          }}
        />
      );

    case 'Searchbox':
      return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
				"@context": "https://schema.org/",
				"@type": "WebSite",
				"name": "Mạng di động iTel",
				"url": "https://v3.itel.vn/",
				"potentialAction": {
				  "@type": "SearchAction",
					 "target": {
					"@type": "EntryPoint",
					"urlTemplate": "https://itel.vn/api/web/search-by-keyword/1/{search_term_string}"
				  },
				  "query-input": "required name=search_term_string"
				}
			  }
			  `
          }}
        />
      );
    case 'Breadcrumb':
      if (router.pathname == routes.HOME) return <></>;

      const listLink: string = router.asPath
        .split('/')
        .filter((text) => text != '')
        .map(
          (_, index) => `,{
			"@type": "ListItem",
			"position": ${index + 2},
			"name": "${page&&page[index]}",
			"item": " ${getlinkURL(index)}"
		  }`
        )
        .join('');
      return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
						"@context": "https://schema.org/",
						"@type": "BreadcrumbList",
						"itemListElement": [{
						  "@type": "ListItem",
						  "position": 1,
						  "name": "Trang chủ",
						  "item": "https://v3.itel.vn/"
						}${listLink}
					]
					  }
				`
          }}
        />
      );

    default:
      return <></>;
  }
};

export default Schema;
