import './component';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'my-4-col-block',
    label: 'Mój blok 4 kolumn',
    category: 'text-image',
    component: 'sw-cms-block-my-4-col-block',
    slots: {
        col1: 'text',
        col2: 'text',
        col3: 'text',
        col4: 'text'
    }
});