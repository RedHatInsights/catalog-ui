import React, { useState, useRef } from 'react';
import { PencilAltIcon } from '@patternfly/react-icons';
import {
  Spinner,
  Dropdown,
  DropdownToggle,
  DropdownItem
} from '@patternfly/react-core';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';
import styled from 'styled-components';
import useFormatMessage from '../../../utilities/use-format-message';
import iconMessages from '../../../messages/icon.messages';

const UploadButton = styled.span`
  border: none;
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  &::after {
    content: ' ';
    position: absolute;
    display: block;
    top: -0.3em;
    right: -0.3em;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 0;
  }
  svg,
  .pf-c-spinner {
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const UploadIconWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const ImagePreview = styled.img`
  height: 64px;
  max-width: 300px;
  object-fit: cover;
`;

const StyledDropdown = styled(Dropdown)`
  .pf-c-dropdown__menu {
    top: 24px;
    left: calc(100% - 24px);
  }
`;

const IconUpload = ({ image, setImage, resetIcon, enableReset, children }) => {
  const formatMessage = useFormatMessage();
  const inputRef = useRef();
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(false);
    return inputRef.current.click();
  };

  const handleReset = () => {
    setImage(undefined);
    setIsUploading(true);
    return resetIcon().then(() => setIsUploading(false));
  };

  const dropdownItems = [
    <DropdownItem onClick={handleClick} key="change-icon">
      {formatMessage(iconMessages.changeIcon)}
    </DropdownItem>,
    <DropdownItem
      isDisabled={!enableReset}
      onClick={handleReset}
      key="reset-icon"
    >
      {formatMessage(iconMessages.resetIcon)}
    </DropdownItem>
  ];

  return (
    <UploadIconWrapper>
      <input
        accept=".png,.svg,.jpeg"
        onChange={(event) => {
          setImage(event.target.files[0]);
        }}
        ref={inputRef}
        type="file"
        id="icon-upload"
        hidden
      />
      <StyledDropdown
        onSelect={() => setIsOpen(false)}
        isOpen={isOpen}
        isPlain
        disabled={isUploading}
        dropdownItems={dropdownItems}
        toggle={
          <DropdownToggle
            disabled={isUploading}
            toggleIndicator={null}
            onToggle={(isOpen, event) => {
              event.stopPropagation();
              setIsOpen(isOpen);
            }}
          >
            <UploadButton ouiaId={'upload-icon'}>
              {isUploading ? (
                <Spinner size="md" />
              ) : (
                <PencilAltIcon size="sm" />
              )}
            </UploadButton>
            {!image && children}
            {image && (
              <ImagePreview
                style={{ height: 64 }}
                src={URL.createObjectURL(image)}
                id={image.name}
              />
            )}
          </DropdownToggle>
        }
      />
    </UploadIconWrapper>
  );
};

IconUpload.propTypes = {
  uploadIcon: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  resetIcon: PropTypes.func.isRequired,
  enableReset: PropTypes.bool
};

export default IconUpload;
