(function (blocks, i18n, element, editor) {
  var el = element.createElement;
  var __ = i18n.__;
  var RichText = editor.RichText;
  var URLInput = editor.URLInput;
  var AlignmentToolbar = editor.AlignmentToolbar;
  var BlockControls = editor.BlockControls;
  var MediaUpload = editor.MediaUpload;

  blocks.registerBlockType('custom/media-text-read-more', {
    title: __('Custom Media & Text Read More'),
    icon: 'format-image',
    category: 'media',
    attributes: {
      image: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'src',
      },
      imageTitle: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'title',
      },
      imageText: {
        type: 'string',
      },
      alignment: {
        type: 'string',
        default: 'left',
      },
      readMoreText: {
        type: 'string',
        default: 'Read More',
      },
      readMoreLink: {
        type: 'string',
      },
    },

    // ... other settings ...

    edit: function (props) {
      var attributes = props.attributes;
      var image = attributes.image;
      var imageTitle = attributes.imageTitle;
      var imageText = attributes.imageText;
      var alignment = attributes.alignment;
      var readMoreText = attributes.readMoreText;
      var readMoreLink = attributes.readMoreLink;

      function onImageSelect(newImage) {
        props.setAttributes({ image: newImage.url });
      }

      function onImageTitleChange(newImageTitle) {
        props.setAttributes({ imageTitle: newImageTitle });
      }

      function onImageTextChange(newImageText) {
        props.setAttributes({ imageText: newImageText });
      }

      function onReadMoreTextChange(newReadMoreText) {
        props.setAttributes({ readMoreText: newReadMoreText });
      }

      function onReadMoreLinkChange(newReadMoreLink) {
        props.setAttributes({ readMoreLink: newReadMoreLink.url });
      }

      return el(
        'div',
        { className: 'wp-block-media-text' },
        // Image Upload
        el(MediaUpload, {
          onSelect: onImageSelect,
          type: 'image',
          value: image,
          render: function ({ open }) {
            return el('img', {
              src: image,
              alt: imageTitle,
              title: imageTitle,
              onClick: open,
            });
          },
        }),

        // Text and Alignment
        el(
          'div',
          {
            className: `media-text-container align${alignment}`,
          },
          el(RichText, {
            tagName: 'div',
            className: 'image-text',
            placeholder: __('Image Text...'),
            value: imageText,
            onChange: onImageTextChange,
          }),
          el(BlockControls, {
            controls: [
              {
                icon: 'align-left',
                title: __('Align Left'),
                isActive: alignment === 'left',
                onClick: function () {
                  props.setAttributes({ alignment: 'left' });
                },
              },
              {
                icon: 'align-right',
                title: __('Align Right'),
                isActive: alignment === 'right',
                onClick: function () {
                  props.setAttributes({ alignment: 'right' });
                },
              },
            ],
          })
        ),

        // "Read More" text field in the editor
        el(RichText, {
          tagName: 'div',
          className: 'read-more-text',
          placeholder: __('Read More Text...'),
          value: readMoreText,
          onChange: onReadMoreTextChange,
        }),

        // "Read More" link field in the editor
        el(URLInput, {
          className: 'read-more-link',
          value: readMoreLink,
          onChange: onReadMoreLinkChange,
          placeholder: __('Read More Link...'),
        })
      );
    },

    // ... other functions ...
  });
})(
  window.wp.blocks,
  window.wp.i18n,
  window.wp.element,
  window.wp.editor
);
