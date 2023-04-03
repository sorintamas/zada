import React from "react";
import { gsap } from "gsap";
import { useInView } from "react-intersection-observer";
import { StaticImage } from "gatsby";

import i18n from "i18next";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import photo1 from "../images/gallery/1_S.jpg";
import photo2 from "../images/gallery/2_S.jpg";
import photo3 from "../images/gallery/3_S.jpg";
import photo4 from "../images/gallery/4_S.jpg";
import photo5 from "../images/gallery/5_S.jpg";
import photo6 from "../images/gallery/6_S.jpg";
import photo7 from "../images/gallery/7_S.jpg";
import photo8 from "../images/gallery/8_S.jpg";
import photo9 from "../images/gallery/9_S.jpg";
import photo10 from "../images/gallery/10_S.jpg";
import photo11 from "../images/gallery/11_S.jpg";
import photo12 from "../images/gallery/12_S.jpg";
import photo13 from "../images/gallery/13_S.jpg";
import photo14 from "../images/gallery/14_S.jpg";
import photo15 from "../images/gallery/15_S.jpg";
import photo16 from "../images/gallery/16_S.jpg";
import photo17 from "../images/gallery/17_S.jpg";
import photo18 from "../images/gallery/18_S.jpg";
import photo19 from "../images/gallery/19_S.jpg";

import photo1_BIG from "../images/gallery/1.jpg";
import photo2_BIG from "../images/gallery/2.jpg";
import photo3_BIG from "../images/gallery/3.jpg";
import photo4_BIG from "../images/gallery/4.jpg";
import photo5_BIG from "../images/gallery/5.jpg";
import photo6_BIG from "../images/gallery/6.jpg";
import photo7_BIG from "../images/gallery/7.jpg";
import photo8_BIG from "../images/gallery/8.jpg";
import photo9_BIG from "../images/gallery/9.jpg";
import photo10_BIG from "../images/gallery/10.jpg";
import photo11_BIG from "../images/gallery/11.jpg";
import photo12_BIG from "../images/gallery/12.jpg";
import photo13_BIG from "../images/gallery/13.jpg";
import photo14_BIG from "../images/gallery/14.jpg";
import photo15_BIG from "../images/gallery/15.jpg";
import photo16_BIG from "../images/gallery/16.jpg";
import photo17_BIG from "../images/gallery/17.jpg";
import photo18_BIG from "../images/gallery/18.jpg";
import photo19_BIG from "../images/gallery/19.jpg";

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

const photosBIG = [
  {
    src: photo19_BIG,
    position: { x: "1/5", y: "1/3" },
  },
  {
    src: photo7_BIG,
    position: { x: "5/7", y: "1/2" },
  },
  {
    src: photo11_BIG,
    position: { x: "5/7", y: "2/3" },
  },
  {
    src: photo8_BIG,
    position: { x: "7/9", y: "1/2" },
  },
  {
    src: photo10_BIG,
    position: { x: "7/9", y: "2/3" },
  },
  {
    src: photo9_BIG,
    position: { x: "9/11", y: "1/2" },
  },
  {
    src: photo1_BIG,
    position: { x: "9/11", y: "2/3" },
  },
  {
    src: photo12_BIG,
    position: { x: "11/13", y: "1/3" },
  },

  {
    src: photo5_BIG,
    position: { x: "1/5", y: "3/5" },
  },
  {
    src: photo2_BIG,
    position: { x: "5/9", y: "3/5" },
  },
  {
    src: photo3_BIG,
    position: { x: "9/13", y: "3/5" },
  },

  {
    src: photo13_BIG,
    position: { x: "1/5", y: "5/7" },
  },
  {
    src: photo15_BIG,
    position: { x: "5/7", y: "5/7" },
  },
  {
    src: photo17_BIG,
    position: { x: "7/9", y: "5/7" },
  },
  {
    src: photo16_BIG,
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
      previousState.current = true;

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
        slides={photosBIG}
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
