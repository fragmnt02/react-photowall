import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";

const GET_QUERY = gql`
  query {
    getDatabase {
      photos
    }
  }
`;

class Fotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    this.getCurrent();
  }

  getCurrent = () => {
    this.props.client
      .query({
        query: GET_QUERY
      })
      .then(res => {
        const { photos } = res.data.getDatabase;
        this.setState({images:photos});
      });
  };


  mapImages = () => {
      const { images } = this.state;
      return images.map((image, index) => (
        <img src={image} key={index} alt="" />
      ));
  };

  render() {
    return (
      <Fragment>
        <h1>FOTOS!!!!!</h1>
        <div>{this.mapImages()}</div>
      </Fragment>
    );
  }
}
export default withApollo(Fotos);
