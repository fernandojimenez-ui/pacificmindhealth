( function ( blocks, element, blockEditor, components ) {
	var el = element.createElement;
	var InspectorControls = blockEditor.InspectorControls;
	var useBlockProps = blockEditor.useBlockProps;
	var useInnerBlocksProps = blockEditor.useInnerBlocksProps;
	var useSetting = blockEditor.useSetting;
	var PanelBody = components.PanelBody;
	var ColorPalette = components.ColorPalette;
	var ToggleControl = components.ToggleControl;
	var __experimentalUnitControl = components.__experimentalUnitControl;

	var waveSvg = function ( color ) {
		var encoded = encodeURIComponent(
			"<svg viewBox='0 0 1200 134' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 98L50 92C100 86 200 74 300 50C400 26 500 -10 600 2C700 14 800 74 900 98C1000 122 1100 110 1150 104L1200 98V134H1150C1100 134 1000 134 900 134C800 134 700 134 600 134C500 134 400 134 300 134C200 134 100 134 50 134H0V98Z' fill='" + color + "'/></svg>"
		);
		return 'url("data:image/svg+xml;utf8,' + encoded + '")';
	};

	blocks.registerBlockType( 'pmh/wave-container', {
		edit: function ( props ) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var isTop = attributes.wavePosition === 'top';

			// Get theme color palette
			var themeColors = useSetting( 'color.palette' ) || [];

			var classes = 'pmh-wave-container';
			if ( isTop ) {
				classes += ' pmh-wave-container--top';
			}

			var blockProps = useBlockProps( {
				className: classes,
				style: {
					minHeight: attributes.minHeight,
					'--pmh-wave-bg': waveSvg( attributes.waveColor ),
				},
			} );

			var innerBlocksProps = useInnerBlocksProps(
				{ className: 'pmh-wave-container__inner' },
				{
					template: [
						[ 'core/paragraph', { placeholder: 'Add content inside the wave container...' } ],
					],
				}
			);

			return el(
				element.Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: 'Wave Settings', initialOpen: true },
						__experimentalUnitControl
							? el( __experimentalUnitControl, {
									label: 'Minimum Height',
									value: attributes.minHeight,
									onChange: function ( value ) {
										setAttributes( { minHeight: value } );
									},
								} )
							: el( components.TextControl, {
									label: 'Minimum Height',
									value: attributes.minHeight,
									onChange: function ( value ) {
										setAttributes( { minHeight: value } );
									},
								} ),
						el( ToggleControl, {
							label: 'Wave on top',
							help: isTop
								? 'Wave is on the top edge.'
								: 'Wave is on the bottom edge.',
							checked: isTop,
							onChange: function () {
								setAttributes( {
									wavePosition: isTop ? 'bottom' : 'top',
								} );
							},
						} ),
						el( 'div', { style: { marginTop: '16px' } },
							el( 'label', {
								className: 'components-base-control__label',
								style: { display: 'block', marginBottom: '8px' },
							}, 'Wave Color' ),
							el( ColorPalette, {
								colors: themeColors,
								value: attributes.waveColor,
								onChange: function ( value ) {
									setAttributes( { waveColor: value || '#FFF5EE' } );
								},
							} )
						)
					)
				),
				el( 'div', blockProps, el( 'div', innerBlocksProps ) )
			);
		},

		save: function ( props ) {
			var attributes = props.attributes;
			var isTop = attributes.wavePosition === 'top';

			var classes = 'pmh-wave-container';
			if ( isTop ) {
				classes += ' pmh-wave-container--top';
			}

			var blockProps = useBlockProps.save( {
				className: classes,
				style: {
					minHeight: attributes.minHeight,
					'--pmh-wave-bg': waveSvg( attributes.waveColor ),
				},
			} );

			var innerBlocksProps = useInnerBlocksProps.save( {
				className: 'pmh-wave-container__inner',
			} );

			return el( 'div', blockProps, el( 'div', innerBlocksProps ) );
		},
	} );
} )(
	window.wp.blocks,
	window.wp.element,
	window.wp.blockEditor,
	window.wp.components
);
