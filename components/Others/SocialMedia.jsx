import Link from "next/link";
import { SlSocialFacebook, SlSocialInstagram } from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";


export const SocialMedia = ({ type, link }) => {

  const getPlatformIcon = (type) => {
    switch (type) {
      case "facebook":
        return <SlSocialFacebook />;
      case "twitter":
        return <FaXTwitter />;
      case "linkedin":
        return <FaLinkedinIn />;
      case "instagram":
        return <SlSocialInstagram />;

    }
  };

  return (
    <Link className="social-media-link" href={link} target={"_blank"} title={type}>
      {getPlatformIcon(type)}
    </Link>
  );
};