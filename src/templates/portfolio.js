import React, { Component } from 'react'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import Lightbox from 'react-images'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

class GalleryComposition extends Component {
  constructor(props) {
    super(props)
    const data = props.data
    const photos = data.allFile.edges
    const LIGHTBOX_IMAGE_SET = []
    photos.map(photo => {
      LIGHTBOX_IMAGE_SET.push({src: photo.node.childImageSharp.fluid.src, thumbnail: photo.node.childImageSharp.fluid.src,  srcSet: photo.node.childImageSharp.fluid.srcSet })
    })
    this.state = {
      shareOpen: false,
      anchorEl: null,
      lightbox: false,
      currentImage: 0,
      photos: LIGHTBOX_IMAGE_SET,
      photos_fluid: photos
    }
  }

  gotoPrevLightboxImage() {
    const { photo } = this.state
    this.setState({ photo: photo - 1 })
  }

  gotoNextLightboxImage() {
    const { photo } = this.state
    this.setState({ photo: photo + 1 })
  }

  openLightbox(photo, event) {
    event.preventDefault()
    this.setState({ lightbox: true, photo })
  }

  closeLightbox() {
    this.setState({ lightbox: false, currentImage: 0 })
  }

  render() {
    return (
      <Layout>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 2}}>
          <Masonry gutter="5px">
            {this.state.photos_fluid.map((photo, i) => {
              return(
                <a
                  key={i}
                  href={photo.node.childImageSharp.fluid.srcSet}
                  onClick={e => this.openLightbox(i, e)}
                >
                  <Img fluid={photo.node.childImageSharp.fluid} />
                </a>
              )
            })}
          </Masonry>
        </ResponsiveMasonry>
        <Lightbox
          backdropClosesModal
          enableKeyboardInput
          showImageCount
          imageCountSeparator={'/'}
          images={this.state.photos}
          preloadNextImage
          currentImage={this.state.photo}
          isOpen={this.state.lightbox}
          onClickPrev={() => this.gotoPrevLightboxImage()}
          onClickNext={() => this.gotoNextLightboxImage()}
          onClose={() => this.closeLightbox()}
        />
      </Layout>
    )
  }
}

export default GalleryComposition

export const portfolioPageQuery = graphql`
query PortfolioQuery {
  allFile(filter: {sourceInstanceName: {eq: "charlotte"}}) {
    edges {
      node {
        absolutePath
        extension
        size
        dir
        modifiedTime
        childImageSharp {
          fluid(maxWidth: 700) {
            ...GatsbyImageSharpFluid
            sizes
          }
        }
      }
    }
  }
}
`
