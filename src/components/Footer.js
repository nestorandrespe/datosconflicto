import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon
} from "react-share";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="item">
          datos:{" "}
          <a href="http://centrodememoriahistorica.gov.co/observatorio/">
            Centro de Memoria Histórica
          </a>
        </div>
        <div className="item">
          <div className="social">
            <FacebookShareButton url="http://ftb.nestorandres.com/datos-colombia/">
              <FacebookIcon size={32} />
            </FacebookShareButton>
          </div>
          <div className="social">
            <TwitterShareButton url="http://ftb.nestorandres.com/datos-colombia/">
              <TwitterIcon size={32} />
            </TwitterShareButton>
          </div>
        </div>
        <div className="item">
          desarrollo: <a href="http://ftb.nestorandres.com/">Follow the Bit</a>
        </div>
      </div>
    </>
  );
}
