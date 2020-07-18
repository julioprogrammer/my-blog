import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import PostItem from "../components/PostItem";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <PostItem
      slug="/about/"
      category="Misc"
      date="30 de Julho de 2019"
      timeToRead="5"
      title="Diga nao ao Medium: tenha sua propria plataforma"
      description="Algumas razoes para voce ter sua propria plataforma ao inves de solucoes como o Medium"
    />
  </Layout>
)

export default IndexPage
