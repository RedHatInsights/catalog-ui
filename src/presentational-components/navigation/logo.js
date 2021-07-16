import { cellWidth } from '@patternfly/react-table';
import * as React from 'react';
// had to declare *.svg in src/index.d.ts
import DefaultLogo from 'src/../static/images/default-logo.svg';

export class Logo extends React.Component {
  render() {
    const { size, image, alt, className, unlockWidth, width } = this.props;

    const style = {
      height: size,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
    };

    if (unlockWidth) {
      style['minWidth'] = size;
    } else {
      style['width'] = size;
    }

    // use inline css so we can set size
    return (
      <div className={className} style={style}>
        <img
          style={{ objectFit: 'contain', maxHeight: size }}
          src={image || DefaultLogo}
          alt={alt}
        />
      </div>
    );
  }
}
