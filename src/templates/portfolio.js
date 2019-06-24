import React, { Component } from "react";
import Img from "gatsby-image";
import Layout from "../components/Layout";
import Lightbox from "react-images";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { chunk, sum } from "lodash";
import { Box } from "rebass";

const Gallery = ({ images, itemsPerRow }) => {
  // Split images into groups of the given size
  const rows = chunk(images, itemsPerRow);

  return (
    <div>
      {rows.map(row => {
        // Sum aspect ratios of images in the given row
        const rowAspectRatioSum = sum(row.map(image => image.aspectRatio));

        return row.map(image => (
          <Box
            key={image.src}
            as={Img}
            fluid={image}
            width={`${(image.aspectRatio / rowAspectRatioSum) * 100}%`}
            css={{ display: "inline-block" }}
            onClick={() => {
              console.log("box clicked");
            }}
          />
        ));
      })}
    </div>
  );
};

class GalleryComposition extends Component {
  constructor(props) {
    super(props);
    const data = props.data;
    const photos = data.allFile.edges;
    const LIGHTBOX_IMAGE_SET = [];
    photos.map(photo => {
      LIGHTBOX_IMAGE_SET.push({
        src: photo.node.childImageSharp.fluid.src,
        thumbnail: photo.node.childImageSharp.fluid.src,
        srcSet: photo.node.childImageSharp.fluid.srcSet
      });
    });
    this.state = {
      shareOpen: false,
      anchorEl: null,
      lightbox: false,
      currentImage: 0,
      photos: LIGHTBOX_IMAGE_SET,
      photos_fluid: photos
    };
  }

  gotoPrevLightboxImage() {
    this.setState(prevState => ({ currentImage: prevState.currentImage - 1 }));
  }

  gotoNextLightboxImage() {
    this.setState(prevState => ({ currentImage: prevState.currentImage + 1 }));
  }

  openLightbox(photo, event) {
    event.preventDefault();
    this.setState({ lightbox: true, currentImage: photo });
  }

  closeLightbox() {
    this.setState({ lightbox: false, currentImage: 0 });
  }

  render() {
    return (
      <Layout>
        <Gallery
          itemsPerRow={3} // This will be changed to `[2, 3]` later
          images={this.state.photos_fluid.map(({ node }) => ({
            ...node.childImageSharp.fluid
          }))}
        />
      </Layout>
    );
  }
}

export default GalleryComposition;

export const portfolioPageQuery = graphql`
  query PortfolioQuery {
    allFile(filter: { sourceInstanceName: { eq: "charlotte" } }) {
      edges {
        node {
          absolutePath
          extension
          size
          dir
          modifiedTime
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
              sizes
            }
          }
        }
      }
    }
  }
`;
