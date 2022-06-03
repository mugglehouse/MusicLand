// 路由懒加载
export default [{
        path: '/',
        // name: 'Content',
        component: () =>
            import ('@/Views/Content')
    },
    {
        path: '/content',
        name: 'Content',
        component: () =>
            import ('@/Views/Content')
    },
    {
        path: '/search',
        name: 'search',
        component: () =>
            import ('@/Views/SongSearch'),
        props: true,
    },
    {
        path: '/playmv',
        name: 'playmv',
        component: () =>
            import ('@/Views/playmv'),
    },
    {
        path: '/newmv',
        name: 'newmv',
        component: () =>
            import ('@/Views/newMV'),
    },
    {
        path: '/wallpaper',
        name: 'wallpaper',
        component: () =>
            import ('@/Views/wallpaper'),
    },
    {
        path: '/Playlist',
        name: 'Playlist',
        component: () =>
            import ('@/Views/PlaylistDetails'),
    },
    {
        path: '/Leaderboard',
        name: 'Leaderboard',
        component: () =>
            import ('@/Views/Leaderboard'),
    },
    {
        path: '/singerlist',
        name: 'singerlist',
        component: () =>
            import ('@/Views/singerlist'),
    },
    {
        path: '/album',
        name: 'album',
        component: () =>
            import ('@/Views/album'),
    },
    {
        path: '/dayrec',
        name: 'dayrec',
        component: () =>
            import ('@/Views/dayrec'),
    },

]