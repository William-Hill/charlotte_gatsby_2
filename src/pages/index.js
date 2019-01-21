import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    console.log("data:", data)
    const image = data.markdownRemark.frontmatter.image

    const bannerStyle = {
      background: `url(${ !!image.childImageSharp ? image.childImageSharp.fluid.src : image })center center`,
      backgroundSize: "cover"
    }

    return (
      <Layout>
        <section className="hero is-fullheight" style={bannerStyle}>
          <div className="hero-head"></div>
          <div className="hero-body"></div>
          <div className="hero-foot"></div>
        </section>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
query IndexQuery {
  markdownRemark(frontmatter: {templateKey: {eq: "index"}}) {
    frontmatter {
      title
      image {
          childImageSharp {
            fluid(maxWidth: 1440, quality: 100) {
              ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
}
`
