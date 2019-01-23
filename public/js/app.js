$('.sidenav').sideNav({
    menuWidth: 280, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true, // Choose whether you can drag to open on touch screens,
 })


$('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration:255,
    constrainWidth: false,
    hover: true ,
    gutter: 0,
    belowOrigin: true,
    alignment: 'left',
    stopPropagation: false
})

