<?php
/**
 * Plugin Name: PMH Test Plugin
 * Description: Test plugin to verify deployment connection.
 * Version: 1.0.0
 * Author: Fernando Jimenez
 */

defined( 'ABSPATH' ) || exit;

add_action( 'admin_notices', function () {
    echo '<div class="notice notice-success"><p><strong>PMH Test Plugin:</strong> Deployment connection verified!</p></div>';
} );
