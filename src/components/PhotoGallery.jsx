import React from "react";
import { gsap } from "gsap";
import { useInView } from "react-intersection-observer";

// import i18n from "i18next";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import photo1 from "../images/gallery/1.jpg";
import photo2 from "../images/gallery/2.jpg";
import photo3 from "../images/gallery/3.jpg";
import photo4 from "../images/gallery/4.jpg";
import photo5 from "../images/gallery/5.jpg";
import photo6 from "../images/gallery/6.jpg";
import photo7 from "../images/gallery/7.jpg";
import photo8 from "../images/gallery/8.jpg";
import photo9 from "../images/gallery/9.jpg";
import photo10 from "../images/gallery/10.jpg";
import photo11 from "../images/gallery/11.jpg";
import photo12 from "../images/gallery/12.jpg";
import photo13 from "../images/gallery/13.jpg";
import photo14 from "../images/gallery/14.jpg";
import photo15 from "../images/gallery/15.jpg";
import photo16 from "../images/gallery/16.jpg";
import photo17 from "../images/gallery/17.jpg";
import photo18 from "../images/gallery/18.jpg";
import photo19 from "../images/gallery/19.jpg";
// import camera from "../images/camera.png";

const photos = [
  {
    src: photo19,
    position: { x: "1/5", y: "1/3" },
  },
  {
    src: photo7,
    position: { x: "5/7", y: "1/2" },
  },
  {
    src: photo11,
    position: { x: "5/7", y: "2/3" },
  },
  {
    src: photo8,
    position: { x: "7/9", y: "1/2" },
  },
  {
    src: photo10,
    position: { x: "7/9", y: "2/3" },
  },
  {
    src: photo9,
    position: { x: "9/11", y: "1/2" },
  },
  {
    src: photo1,
    position: { x: "9/11", y: "2/3" },
  },
  {
    src: photo12,
    position: { x: "11/13", y: "1/3" },
  },

  {
    src: photo5,
    position: { x: "1/5", y: "3/5" },
  },
  {
    src: photo2,
    position: { x: "5/9", y: "3/5" },
  },
  {
    src: photo3,
    position: { x: "9/13", y: "3/5" },
  },

  {
    src: photo13,
    position: { x: "1/5", y: "5/7" },
  },
  {
    src: photo15,
    position: { x: "5/7", y: "5/7" },
  },
  {
    src: photo17,
    position: { x: "7/9", y: "5/7" },
  },
  {
    src: photo16,
    position: { x: "9/13", y: "5/7" },
  },
];

export const PhotoGallery = (props) => {
  const { ref, inView } = useInView({
    // triggerOnce: true,
    threshold: 0.5,
  });

  const { title } = props;
  const [open, setOpen] = React.useState(false);

  const [selectedPhotoIndex, setSelectedPhotoIndex] =
    React.useState(-1);

  const previousState = React.useRef(false);
  const titleRef = React.useRef(false);

  const tween = React.useRef(null);

  React.useLayoutEffect(() => {
    tween.current = gsap.from(titleRef.current, {
      opacity: 0,
      x: -200,
      duration: 1,
    });
    tween.current.pause();
  }, []);

  React.useEffect(() => {
    if (inView && !previousState.current) {
      console.log(previousState.current);
      previousState.current = true;
      console.log("should play ...");
      tween.current.play();
      // timeline.current.play();
    } else {
      previousState.current = false;
    }
  }, [inView]);

  return (
    <div className="section" id="gallery" ref={ref}>
      <div className="section-title" ref={titleRef}>
        {title}
      </div>

      <div className="thumbnails-wrapper">
        {photos.map((photo, index) => (
          <Thumbnail
            {...photo}
            key={index}
            setSelectedPhotoIndex={() => {
              if (!open) {
                setOpen(true);
              }
              setSelectedPhotoIndex(index);
            }}
            shouldPlay={inView}
          />
        ))}
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={photos}
        index={selectedPhotoIndex}
      />
    </div>
  );
};

const Thumbnail = (props) => {
  const {
    src,
    setSelectedPhotoIndex,
    position: { x, y },
    shouldPlay,
  } = props;

  const imgRef = React.useRef(null);

  let tween = React.useRef(null);

  React.useLayoutEffect(() => {
    const animation =
      Math.random() <= 0.5
        ? { y: Math.random() <= 0.5 ? -200 : 200, x: 0 }
        : { x: Math.random() <= 0.5 ? -200 : 200, y: 0 };

    tween.current = gsap.from(imgRef.current, {
      // scale: 0,
      x: animation.x,
      y: animation.y,
      opacity: 0,
      duration: 1,
      delay: Math.random(),
      // delay: 0.05,
    });
    tween.current.pause();
  }, []);

  React.useEffect(() => {
    if (shouldPlay) {
      console.log("gallery playing");
      tween.current.play();
    }
  }, [shouldPlay]);

  return (
    <div
      className="thumbnail-wrapper"
      onClick={setSelectedPhotoIndex}
      style={{ gridColumn: x, gridRow: y }}
      //   style={{ background: `url(${src})` }}
    >
      {/* <div
        className="dummy-image-replacer"
        style={{ width: "100%", height: "100%" }}
      /> */}
      <img src={src} ref={imgRef} />
    </div>
  );
};
