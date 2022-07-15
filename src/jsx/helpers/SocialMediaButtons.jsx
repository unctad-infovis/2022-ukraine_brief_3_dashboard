import React from 'react';
import PropTypes from 'prop-types';

function SocialMediaButtons({
  text, url, image, extra_class
}) {
  const shareButtonClick = (event) => {
    const specs = `top=${(window.height / 2) - (420 / 2)},left=${(window.width / 2) - (550 / 2)},toolbar=0,status=0,width=550,height=420`;
    window.open(event.currentTarget.href, 'Jaa', specs);
    event.preventDefault();
  };

  return (
    <div className={`social_media_buttons ${extra_class}`}>
      Share on
      {' '}
      <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent('UNCTAD,EDAR')}&text=${encodeURIComponent(`${text} ${image}`)}`} target="_blank" onClick={(event) => shareButtonClick(event)} rel="noreferrer">
        <img src="https://unctad.org/themes/custom/newyork/images/inline-images/sn6.png" alt="" />
        Twitter
      </a>
    </div>
  );
}

SocialMediaButtons.propTypes = {
  extra_class: PropTypes.string,
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

SocialMediaButtons.defaultProps = {
  extra_class: ''
};

export default SocialMediaButtons;
