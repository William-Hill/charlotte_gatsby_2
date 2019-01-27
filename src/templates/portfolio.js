import React, { Component } from 'react'
import Img from 'gatsby-image'
import Lightbox from 'react-images'
import Gallery from 'react-photo-gallery';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

class GalleryComposition extends Component {
  constructor(props) {
    super(props)
    console.log("props:", this.props)
    const data = props.data
    const photos = data.allFile.edges
    console.log("photos:", photos)
    const LIGHTBOX_IMAGE_SET = []
    photos.map(photo => {
      var fraction = photo.node.childImageSharp.fluid.aspectRatio
      const len = fraction.toString().length - 2;
      var denominator = Math.pow(10, len);
      var numerator = fraction * denominator;
      var divisor = this.gcd(numerator, denominator);    // Should be 5

      numerator /= divisor;                         // Should be 687
      denominator /= divisor;                       // Should be 2000
      // console.log(Math.floor(numerator) + '/' + Math.floor(denominator));
      const width = Math.floor(numerator)
      const height = Math.floor(denominator)
      LIGHTBOX_IMAGE_SET.push({src: photo.node.childImageSharp.fluid.src, thumbnail: photo.node.childImageSharp.fluid.src,  srcSet: photo.node.childImageSharp.fluid.srcSet, width: width, height:height })
    })
    console.log("LIGHTBOX_IMAGE_SET:", LIGHTBOX_IMAGE_SET)
    this.state = {
      shareOpen: false,
      anchorEl: null,
      lightbox: false,
      currentImage: 0,
      photos: LIGHTBOX_IMAGE_SET,
      photos_fluid: photos
    }
  }

  gcd(a, b) {
    if (b < 0.0000001) return a;                // Since there is a limited precision we need to limit the value.

    return this.gcd(b, Math.floor(a % b));           // Discard any fractions due to limitations in precision.
  };

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
      <>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 2}}>
          <Masonry gutter="5px">
            {this.state.photos_fluid.map((photo, i) => {
              console.log("photo in map:", photo)
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
      </>
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
