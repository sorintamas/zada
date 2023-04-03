import React from "react";
import { Link } from "gatsby";
import { gsap, TweenMax } from "gsap";
import { SplitText } from "gsap/dist/SplitText";
import scrollToElement from "scroll-to-element";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import video from "../video/zada480.mp4";
import "../css/styles.scss";
import { useInView } from "react-intersection-observer";
import videoProjector from "../images/videoprojector.svg";
import foosball from "../images/foosball.png";
import bbq from "../images/bbq.png";
import playground from "../images/playground.svg";
import boardgames from "../images/boardgames.svg";
import fiber from "../images/fiber.png";
import header from "../images/header.webp";
import oven from "../images/oven.png";
import larch from "../images/larch.svg";
import hiking from "../images/hiking.svg";
import facebook from "../images/facebook.svg";
import insta from "../images/insta.svg";
import whatsapp from "../images/whatsapp.svg";
import email from "../images/email.svg";
import { PhotoGallery } from "../components/PhotoGallery";
import { i18n } from "../i18n";
import { useTranslation, Trans } from "react-i18next";
import carret from "../images/down_carret.svg";
import burger from "../images/burger.svg";

import ro from "../images/ro.png";
import en from "../images/en.png";

const Index = (props) => {
  const { t, i18n } = useTranslation();

  React.useLayoutEffect(() => {
    i18n.init({ lng: "ro" });

    gsap.registerPlugin(SplitText);
  }, []);

  // return <Example />;

  return (
    <div className="outer-main-wrapper">
      <Header />
      <div className="main-wrapper">
        <div className="video-wrapper">
          <video muted autoPlay loop>
            <source src={video} type="video/mp4" />
          </video>
          <div className="video-vignette" />
        </div>
        <div className="content-wrapper">
          <Section
            position="left"
            number="one"
            title={t("about.title")}
            content={t("about.content")}
            icon={larch}
            anchor="about"
          />
          <Section
            position="right"
            title={t("activities.title")}
            content={t("activities.content")}
            icon={hiking}
            anchor="activities"
          />
          <PhotoGallery title={t("gallery.title")} />

          <Facilities
            position="right"
            number="two"
            title={t("facilities.title")}
            anchor="facilities"
            facilities={[
              {
                label: "facilities.heater",
                icon: header,
              },
              {
                label: "facilities.projector",
                icon: videoProjector,
              },
              {
                label: "facilities.opticFiber",
                icon: fiber,
              },
              {
                label: "facilities.bbq",
                icon: bbq,
              },
              {
                label: "facilities.oven",
                icon: oven,
              },
              {
                label: "facilities.playground",
                icon: playground,
              },
              {
                label: "facilities.boardgames",
                icon: boardgames,
              },
              {
                label: "facilities.foosball",
                icon: foosball,
              },
            ]}
          />

          <Contact
            anchor="contact"
            contacts={[
              { label: "0756 622 487", icon: whatsapp },
              {
                label: "cabanazada@gmail.com",
                icon: email,
              },
              {
                label: "/zadanaturelounge",
                link: "https://facebook.com/zadanaturelounge",
                icon: facebook,
              },
              {
                label: "/zadanaturelounge",
                link: "https://instagram.com/zadanaturelounge",
                icon: insta,
              },
            ]}
          />
        </div>
      </div>
      <Map />
    </div>
  );
};

const Header = () => {
  const { t } = useTranslation();
  const [menuIsVisible, setMenuIsVisible] =
    React.useState(false);
  const [languageListIsVisible, setLanguageListIsVisible] =
    React.useState(false);

  const menuIsVisibleHandler = (value) => {
    setMenuIsVisible(value);
    setLanguageListIsVisible(false);
  };

  const languageListIsVisibleHandler = (value) => {
    setLanguageListIsVisible(value);
    setMenuIsVisible(false);
  };

  const items = [
    { label: t("header.about"), anchor: "about" },
    { label: t("header.activities"), anchor: "activities" },
    { label: t("header.gallery"), anchor: "gallery" },
    { label: t("header.facilities"), anchor: "facilities" },
    { label: t("header.contact"), anchor: "contact" },
  ];

  return (
    <div className="header-wrapper">
      <div className="header-inner-wrapper">
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            scrollToElement(`.outer-main-wrapper`, {
              offset: -120,
            });
          }}
        >
          <Logo />
        </Link>
        <div style={{ display: "flex" }}>
          <Menu
            items={items}
            menuIsVisible={menuIsVisible}
            menuIsVisibleHandler={menuIsVisibleHandler}
          />
          <LanguageSelector
            languageListIsVisibleHandler={
              languageListIsVisibleHandler
            }
            languageListIsVisible={languageListIsVisible}
          />
        </div>
      </div>
    </div>
  );
};

const Logo = (props) => {
  const { color } = props;
  return (
    <div className="logo-wrapper">
      <div className="image-wrapper">
        <img src={larch} />
      </div>
      <div className="text-wrapper">
        {/* <div>Zada Nature</div>
        <div>Lounge</div> */}
        Zada Nature Lounge
      </div>
    </div>
  );
};

const LanguageSelector = (props) => {
  const {
    languageListIsVisibleHandler,
    languageListIsVisible,
  } = props;
  const { i18n } = useTranslation();

  const languageIcon = i18n.language === "ro" ? ro : en;

  const languages = [
    { label: "ro", imgSrc: ro },
    { label: "en", imgSrc: en },
  ];

  return (
    <div className="language-selector-wrapper">
      <div className="inner-wrapper">
        <div
          className="selected-language"
          onClick={(e) => {
            languageListIsVisibleHandler(
              !languageListIsVisible
            );
            e.stopPropagation();
          }}
        >
          <span>{i18n.language}</span>
          <img src={languageIcon} />
          <img src={carret} className="carret-img" />
        </div>
        {languageListIsVisible ? (
          <LanguageOptions
            languages={languages}
            onClickHandler={() =>
              languageListIsVisibleHandler(false)
            }
          />
        ) : null}
      </div>
    </div>
  );
};

const LanguageOptions = (props) => {
  const { i18n } = useTranslation();

  const { languages, onClickHandler } = props;

  const eventListener = React.useCallback((event) => {
    const targetElement = document.querySelector(
      ".language-list-wrapper"
    );

    if (!targetElement) {
      return;
    }

    if (targetElement.contains(event.target)) {
    } else {
      onClickHandler();
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener("click", eventListener);
    return () => {
      document.removeEventListener("click", eventListener);
    };
  }, []);

  return (
    <div className="language-list-wrapper">
      {languages.map((language, index) => (
        <LanguageItem
          {...language}
          key={index}
          changeLanguage={i18n.changeLanguage}
          hideList={onClickHandler}
        />
      ))}
    </div>
  );
};

const LanguageItem = (props) => {
  const { label, imgSrc, changeLanguage, hideList } = props;
  return (
    <div
      className="language-item"
      onClick={() => {
        changeLanguage(label);
        hideList();
      }}
    >
      <img src={imgSrc} />
    </div>
  );
};

const Menu = (props) => {
  const { items, menuIsVisible, menuIsVisibleHandler } =
    props;

  return (
    <>
      <div className="top-menu-wrapper">
        {items.map((item, index) => (
          <MenuItem {...item} key={index} />
        ))}
      </div>
      <div className="top-menu-wrapper-mobile">
        <BurgerMenu
          items={items}
          menuIsVisible={menuIsVisible}
          menuIsVisibleHandler={menuIsVisibleHandler}
        />
      </div>
    </>
  );
};

const MenuItem = (props) => {
  const { label, anchor } = props;

  return (
    <div className="top-menu-item-wrapper">
      <Link
        to={`/#${anchor}`}
        onClick={(e) => {
          e.preventDefault();
          scrollToElement(`#${anchor}`, {
            offset: -120,
          });
        }}
      >
        {label}
      </Link>
    </div>
  );
};

const BurgerMenu = (props) => {
  const { items, menuIsVisible, menuIsVisibleHandler } =
    props;

  const [isMenuVisible, setIsMenuVisible] =
    React.useState(false);

  const eventListener = React.useCallback((event) => {
    const targetElement = document.querySelector(
      ".vertical-wrapper"
    );

    if (!targetElement) {
      return;
    }

    if (targetElement.contains(event.target)) {
    } else {
      menuIsVisibleHandler(false);
    }
  }, []);

  React.useEffect(() => {
    if (menuIsVisible) {
      document.addEventListener("click", eventListener);
    } else {
      document.removeEventListener("click", eventListener);
    }
  }, [menuIsVisible]);

  return (
    <>
      <img
        src={burger}
        onClick={(e) => {
          menuIsVisibleHandler(!menuIsVisible);
          e.stopPropagation();
        }}
      />
      {menuIsVisible ? (
        <div className="vertical-wrapper">
          {items.map((item, index) => (
            <BurgerMenuItem
              {...item}
              key={index}
              onClick={() => menuIsVisibleHandler(false)}
            />
          ))}
        </div>
      ) : null}
    </>
  );
};

const BurgerMenuItem = (props) => {
  const { label, onClick, anchor } = props;

  return (
    <div
      className="top-menu-burger-item-wrapper"
      onClick={onClick}
    >
      <Link
        to={`/#${anchor}`}
        onClick={(e) => {
          e.preventDefault();
          scrollToElement(`#${anchor}`, {
            offset: -120,
          });
        }}
      >
        {label}
      </Link>
    </div>
  );
};

const Map = () => {
  return (
    <iframe
      width="100%"
      height="400"
      frameBorder="0"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCRBwcd8_s-ms3mwSW7x4lCm0Ui5chgq_g
    &zoom=10&q=place_id:ChIJn1doh7ITSUcRAKG6ulw4rsY"
      allowFullScreen
    ></iframe>
  );
};

const Section = (props) => {
  const { ref, inView } = useInView({
    // triggerOnce: true,
    threshold: 0.7,
  });

  const previousState = React.useRef(false);

  const sectionRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const imageRefMobil = React.useRef(null);
  const sectionContentRef = React.useRef(null);

  const {
    position,
    number,
    title,
    content,
    contentType,
    icon,
    anchor,
  } = props;

  const timeline = React.useRef(
    gsap.timeline({ paused: true })
  );

  React.useLayoutEffect(() => {
    gsap.registerPlugin(SplitText);

    const splitText = new SplitText(sectionRef.current, {
      type: "words",
    });
    const tween = gsap.from(splitText.words, {
      opacity: 0,
      x: position === "left" ? -100 : 100,
      duration: 1,
      stagger: 0.02,
      // scale: 0,
      // rotationX: 90,
    });
    timeline.current.add(tween);

    const tweenImg = gsap.from(imageRef.current, {
      opacity: 0,
      x: position === "left" ? 200 : -200,
      duration: 1,
    });

    const tweenImgMobil = gsap.from(imageRefMobil.current, {
      opacity: 0,
      x: position === "left" ? 200 : -200,
      duration: 1,
    });

    timeline.current.add(tweenImg, 0.2);
    timeline.current.add(tweenImgMobil, 0.2);
  }, []);

  React.useEffect(() => {
    if (inView && !previousState.current) {
      previousState.current = true;

      timeline.current.play();
    } else {
      previousState.current = false;
    }
  }, [inView]);

  return (
    <div
      className="section-grid section"
      id={anchor}
      ref={ref}
    >
      <div
        className={`${position}-section-wrapper section-wrapper ${
          inView ? `visible` : `hidden`
        }`}
        ref={sectionRef}
        data-inview={inView}
      >
        <div className="section-title-wrapper">
          <div className="section-title">{title}</div>
          <div
            className="mobile-icon-wrapper"
            ref={imageRefMobil}
          >
            <img src={icon} />
          </div>
        </div>
        <div
          className="section-content"
          ref={sectionContentRef}
        >
          {content}
        </div>
      </div>
      <div
        className={`${position}-section-icon section-icon`}
        ref={imageRef}
      >
        <img src={icon} />
      </div>
    </div>
  );
};

const Facilities = (props) => {
  const { t } = useTranslation();
  const { facilities, anchor } = props;

  const sectionRef = React.useRef(null);

  const { ref, inView } = useInView({
    // triggerOnce: true,
    threshold: 0.2,
  });

  const tween = React.useRef(null);
  const previousState = React.useRef(false);

  React.useLayoutEffect(() => {
    tween.current = gsap.from(sectionRef.current, {
      opacity: 0,
      x: 100,
      duration: 1,
      stagger: 0.02,
      // scale: 0,
      // rotationX: 90,
    });
    tween.current.pause();
  }, []);

  React.useEffect(() => {
    if (inView && !previousState.current) {
      previousState.current = true;

      tween.current.play();
    } else {
      previousState.current = false;
    }
  }, [inView]);

  return (
    <div className="section" id={anchor} ref={ref}>
      <div className="section-title" ref={sectionRef}>
        {t("facilities.title")}
      </div>
      <div className="facilities-wrapper">
        {facilities.map((facility, index) => (
          <Facility
            {...facility}
            key={index}
            shouldPlay={inView}
          />
        ))}
      </div>
    </div>
  );
};

const Facility = (props) => {
  const { label, icon, shouldPlay } = props;

  const { t } = useTranslation();

  const tween = React.useRef(null);
  const facilityRef = React.useRef(null);

  React.useLayoutEffect(() => {
    tween.current = gsap.from(facilityRef.current, {
      scale: 0,
      // x: animation.x,
      // y: animation.y,
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
    <div className="facility-wrapper" ref={facilityRef}>
      <div className="facility-icon">
        <img src={icon} />
      </div>
      <div className="facility-label">{t(label)}</div>
    </div>
  );
};

const Contact = (props) => {
  const { contacts, anchor } = props;
  const tween = React.useRef(null);

  const sectionRef = React.useRef(null);
  const previousState = React.useRef(false);

  const { ref, inView } = useInView({
    // triggerOnce: true,
    threshold: 0.7,
  });

  React.useLayoutEffect(() => {
    tween.current = gsap.from(sectionRef.current, {
      opacity: 0,
      duration: 0.5,
      stagger: 0.02,
      // delay: 0.5,
      // scale: 0,
      // rotationX: 90,
    });
    tween.current.pause();
  }, []);

  React.useEffect(() => {
    if (inView && !previousState.current) {
      previousState.current = true;

      tween.current.play();
    } else {
      previousState.current = false;
    }
  }, [inView]);

  return (
    <div
      className="contact-wrapper section"
      id={anchor}
      ref={ref}
    >
      <div className="section-title" ref={sectionRef}>
        Contact
      </div>
      <div className="contact-details-wrapper">
        {contacts.map((contact, index) => (
          <ContactItem
            {...contact}
            key={index}
            shouldPlay={inView}
          />
        ))}
      </div>
    </div>
  );
};

const ContactItem = (props) => {
  const { label, icon, link, shouldPlay } = props;

  const tween = React.useRef(null);
  const imgTween = React.useRef(null);
  const sectionRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const previousState = React.useRef(false);

  React.useLayoutEffect(() => {
    gsap.registerPlugin(SplitText);

    const splitText = new SplitText(sectionRef.current, {
      type: "chars",
    });
    tween.current = gsap.from(splitText.chars, {
      opacity: 0,
      x: 20,
      duration: 0.4,
      stagger: 0.05,
      delay: 0.5,
      // scale: 0,
      // rotationX: 90,
    });

    imgTween.current = gsap.from(imgRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      // stagger: 0.05,
      delay: 0.5,
    });
    tween.current.pause();
    imgTween.current.pause();
    // tween.current.pause();
    // timeline.current.add(tween);
  }, []);

  React.useEffect(() => {
    if (shouldPlay) {
      tween.current.play();
      imgTween.current.play();
    }
  }, [shouldPlay]);

  return (
    <div className="contact-item-wrapper">
      <div className="contact-icon" ref={imgRef}>
        <img src={icon} />
      </div>

      <div className="contact-label" ref={sectionRef}>
        {link ? (
          <a href={link} target="_BLANK">
            {label}
          </a>
        ) : (
          label
        )}
      </div>
    </div>
  );
};

export default Index;
