export const PROPAGATED_ASSET_FLAG = 'astroPropagatedAssets';
export const CONTENT_RENDER_FLAG = 'astroRenderContent';
export const CONTENT_FLAG = 'astroContentCollectionEntry';
export const DATA_FLAG = 'astroDataCollectionEntry';
export const CONTENT_IMAGE_FLAG = 'astroContentImageFlag';

export const VIRTUAL_MODULE_ID = 'astro:content';
export const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;
export const DATA_STORE_VIRTUAL_ID = 'astro:data-layer-content';
export const RESOLVED_DATA_STORE_VIRTUAL_ID = '\0' + DATA_STORE_VIRTUAL_ID;
export const ASSET_IMPORTS_VIRTUAL_ID = 'astro:asset-imports';
export const ASSET_IMPORTS_RESOLVED_STUB_ID = '\0' + ASSET_IMPORTS_VIRTUAL_ID;
export const LINKS_PLACEHOLDER = '@@ASTRO-LINKS@@';
export const STYLES_PLACEHOLDER = '@@ASTRO-STYLES@@';
export const SCRIPTS_PLACEHOLDER = '@@ASTRO-SCRIPTS@@';
export const IMAGE_IMPORT_PREFIX = '__ASTRO_IMAGE_';

export const CONTENT_FLAGS = [
	CONTENT_FLAG,
	CONTENT_RENDER_FLAG,
	DATA_FLAG,
	PROPAGATED_ASSET_FLAG,
	CONTENT_IMAGE_FLAG,
] as const;

export const CONTENT_TYPES_FILE = 'types.d.ts';

export const DATA_STORE_FILE = 'data-store.json';
export const ASSET_IMPORTS_FILE = 'assets.mjs';

export const CONTENT_LAYER_TYPE = 'experimental_content';
