import './styles/main.css';
import { route, start } from './router.js';
import { mountHeader } from './components/ui.js';
import * as home from './pages/home.js';
import * as product from './pages/product.js';
import * as cart from './pages/cart.js';
import * as checkout from './pages/checkout.js';
import * as confirmation from './pages/confirmation.js';
import * as track from './pages/track.js';

route(/^\/$/, home);
route(/^\/product\/([^/]+)$/, product);
route(/^\/cart$/, cart);
route(/^\/checkout$/, checkout);
route(/^\/order\/([^/]+)$/, confirmation);
route(/^\/track$/, track);

mountHeader(document.getElementById('app-header')).catch(() => {});
start(document.getElementById('app'));
