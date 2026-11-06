import Head from 'next/head';
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  absoluteUrl,
  buildJsonLd,
  serializeJsonLd,
} from '@/lib/site';

const HomeSeo: React.FC = () => {
  const canonical = absoluteUrl('/');
  const ogImage = absoluteUrl(OG_IMAGE.path);
  const ogImageAlt = `${SITE_NAME} — Full-Stack .NET Developer`;

  return (
    <Head>
      <title key="title">{SITE_TITLE}</title>
      <meta key="description" name="description" content={SITE_DESCRIPTION} />
      <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
      <link key="icon" rel="icon" href="/favicon.ico" />
      {canonical && <link key="canonical" rel="canonical" href={canonical} />}

      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />
      <meta key="og:title" property="og:title" content={SITE_TITLE} />
      <meta key="og:description" property="og:description" content={SITE_DESCRIPTION} />
      <meta key="og:locale" property="og:locale" content="en_US" />
      <meta key="og:locale:alternate" property="og:locale:alternate" content="ru_RU" />
      {canonical && <meta key="og:url" property="og:url" content={canonical} />}
      {ogImage && (
        <>
          <meta key="og:image" property="og:image" content={ogImage} />
          <meta key="og:image:width" property="og:image:width" content={String(OG_IMAGE.width)} />
          <meta key="og:image:height" property="og:image:height" content={String(OG_IMAGE.height)} />
          <meta key="og:image:alt" property="og:image:alt" content={ogImageAlt} />
        </>
      )}

      <meta key="twitter:card" name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
      <meta key="twitter:title" name="twitter:title" content={SITE_TITLE} />
      <meta key="twitter:description" name="twitter:description" content={SITE_DESCRIPTION} />
      {ogImage && <meta key="twitter:image" name="twitter:image" content={ogImage} />}
      {ogImage && <meta key="twitter:image:alt" name="twitter:image:alt" content={ogImageAlt} />}

      <script
        key="ld-json"
        type="application/ld+json"
        // static, build-time data; `<` is escaped in serializeJsonLd
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd()) }}
      />
    </Head>
  );
};

export default HomeSeo;
