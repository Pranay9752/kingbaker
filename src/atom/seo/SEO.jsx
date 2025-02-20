import { Helmet } from "react-helmet-async";

const SEO = ({ title, description = "Beginner-friendly page for learning React Helmet." }) => {
  const pageTitle = title ? `${title} | Jojo Cart` : "Jojo Cart";

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default SEO;
