<?php
/**
 * Plugin Name: PMH Wave Block
 * Description: A Gutenberg container block with a wavy bottom edge.
 * Version: 1.0.0
 * Author: Fernando Jimenez
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', function () {
	register_block_type( __DIR__ );
} );
