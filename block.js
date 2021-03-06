/**
 * Editable Block Example
 *
 * https://github.com/modularwp/gutenberg-block-editable-example
 */
( function() {
	var __                = wp.i18n.__; // The __() function for internationalization.
	var createElement     = wp.element.createElement; // The wp.element.createElement() function to create elements.
	var registerBlockType = wp.blocks.registerBlockType; // The registerBlockType() function to register blocks.
	var Editable          = wp.blocks.Editable; // For creating editable elements.
	var BlockControls     = wp.blocks.BlockControls; // For adding control elements.
	var AlignmentToolbar  = wp.blocks.AlignmentToolbar; // For creating the alignment toolbar element within the control elements.

	/**
	 * Register block
	 *
	 * @param  {string}   name     Block name.
	 * @param  {Object}   settings Block settings.
	 * @return {?WPBlock}          Block itself, if registered successfully,
	 *                             otherwise "undefined".
	 */
	registerBlockType(
		'mdlr/block-toolbar-control-example', // Block name. Must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
		{
			title: __( 'Toolbar Control Example' ), // Block title. __() function allows for internationalization.
			icon: 'admin-tools', // Block icon from Dashicons. https://developer.wordpress.org/resource/dashicons/.
			category: 'common', // Block category. Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
			attributes: {
				content: {
					type: 'string',
					default: 'Block content can be aligned with toolbar.',
				},
				alignment: {
					type: 'string',
				},
			},

			// Defines the block within the editor.
			edit: function( props ) {
				var content = props.attributes.content;
				var alignment = props.attributes.alignment;
				var focus = props.focus;

				function onChangeContent( updatedContent ) {
					props.setAttributes( { content: updatedContent } );
				}

				function onChangeAlignment( updatedAlignment ) {
					props.setAttributes( { alignment: updatedAlignment } );
				}

				return [
					focus &&
					createElement(
						BlockControls,
						{},
						createElement(
							AlignmentToolbar,
							{
								value: alignment,
								onChange: onChangeAlignment
							}
						)
					),
					createElement(
						Editable,
						{
							tagName: 'p',
							className: props.className,
							style: { textAlign: alignment },
							value: content,
							onChange: onChangeContent,
							focus: focus,
							onFocus: props.setFocus
						},
					)
				];
			},

			// Defines the saved block.
			save: function( props ) {
				var content = props.attributes.content;
				var alignment = props.attributes.alignment;

				return createElement(
					'p',
					{
						className: props.className,
						style: { textAlign: alignment },
					},
					content
				);
			},
		}
	);
})();
