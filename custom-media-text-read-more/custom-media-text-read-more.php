<?php
/*
Plugin Name: Custom Media Text Read More
*/

function custom_media_text_read_more_block_init() {
    register_block_type('custom/media-text-read-more', array(
        'editor_script' => 'custom-media-text-read-more-block-editor',
        'render_callback' => 'custom_media_text_read_more_render_callback',
    ));
}

add_action('init', 'custom_media_text_read_more_block_init');

function custom_media_text_read_more_enqueue_block_editor_assets() {
    wp_enqueue_script(
        'custom-media-text-read-more-block-editor',
        plugin_dir_url(__FILE__) . 'assets/js/block.js',
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'),
        filemtime(plugin_dir_path(__FILE__) . 'assets/js/block.js')
    );
}

add_action('enqueue_block_editor_assets', 'custom_media_text_read_more_enqueue_block_editor_assets');

function custom_media_text_read_more_render_callback($attributes) {
    $mediaUrl = $attributes['image'];
    $mediaAlt = $attributes['imageTitle'];
    $imageText = $attributes['imageText'];
    $readMoreText = $attributes['readMoreText'];
    $readMoreLink = $attributes['readMoreLink'];

    // Media HTML
    $mediaHtml = '';
    if ($mediaUrl && $mediaAlt) {
        $mediaHtml = sprintf(
            '<figure class="wp-block-media-text__media">
                <img src="%s" alt="%s" />
            </figure>',
            esc_url($mediaUrl),
            esc_attr($mediaAlt)
        );
    }

    // Text HTML
    $textHtml = '';
    if ($imageText) {
        $textHtml = sprintf(
            '<div class="wp-block-media-text__content">
                %s
            </div>',
            apply_filters('the_content', $imageText)
        );
    }

    // "Read More" link in frontend
    $readMoreLinkHtml = $readMoreLink ? sprintf('<a href="%s" target="_blank">%s</a>', esc_url($readMoreLink), esc_html($readMoreText)) : null;

    return sprintf(
        '<div class="wp-block-media-text">
            %s
            %s
            %s
        </div>',
        $mediaHtml,
        $textHtml,
        $readMoreLinkHtml
    );
}
