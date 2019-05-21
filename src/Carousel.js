import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };

  // this is the binding to 'this' to the Carousel when we are using cunstructors, when the experimental feature is not enabled
  //   constructor(props){
  //       super(props)

  //       this.handleIndexClick = this.handleIndexClick.bind(this)
  //   }

  //DerivedState is ALWAYS STATIC !!!!
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos }; //return the object we want in the state
  }

  //When the experimental feature is enabled we use the event =>
  //this makes the 'this' binding to the Carusel
  handleIndexClick = event => {
    this.setState({
      active: +event.target.dataset.index //the + in front of event is  a uniary +. It returns a number instead of a string
    });
  };
  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
