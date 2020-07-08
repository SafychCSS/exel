import {$} from '@core/dom';

export function resizeHandler($root, e) {
    const $resizer = $(e.target);
    // const $parent = $resizer.$el.parentNode; bad!
    // const $parent = $resizer.$el.closest('.column'); bad! but better
    const $parent = $resizer.closestDom('[data-type="resizable"');
    e.target.classList.add('resize-active');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value;

    $resizer.css({
        opacity: 1,
        [sideProp]: '-5000px'
    });

    document.onmousemove = event => {
        if (type === 'col') {
            const delta = event.pageX - coords.right;
            value = coords.width + delta;
            $resizer.css({right: -delta + 'px'});
        } else {
            const delta = event.pageY - coords.bottom;
            value = coords.height + delta;
            $resizer.css({bottom: -delta + 'px'});
        }
    };

    document.onmouseup = () => {
        e.target.classList.remove('resize-active');

        if (type === 'col') {
            $parent.css({width: value + 'px'});
            $root.findAll(`[data-col="${$parent.data.col}"]`)
                .forEach(el => el.style.width = value + 'px');
        } else {
            $parent.css({height: value + 'px'});
        }

        $resizer.css({bottom: 0, right: 0, opacity: 0});

        document.onmouseup = null;
        document.onmousemove = null;
    };
}
