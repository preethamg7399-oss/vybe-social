import { User, Post, Story, Conversation, NotificationItem } from '../types';

export const CURRENT_USER: User = {
  id: 'user_alex',
  username: 'alex_creative',
  name: 'Alex Vance',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwGaJZxw9CioMrybdGYzydiIpE1ooQNt05DEfYqPVK9cjH0z14g-AV_R_xGyaume4oPuCUPZW1A8RgHstMYpi2nTLOIAnB84OYeP2gNqLrdrYh7A_bxQjL15F134AQt61rKRJBGGmswkPzJvwPReGp76mHQtucehNcATrHuZg4V0UctukAN8yaEp2r0yuHReUHUAKsLz5bmdcvvAqui6SZBpDjba5DlPdfYKhTa7FX9n6jiClw0Zee6A',
  verified: true,
  bio: "Editorial visual artist & analog archivist 🎞️ Exploring light in San Francisco & Tokyo. Contax G2 + Leica M6.",
  location: "San Francisco, CA",
  followersCount: 14820,
  followingCount: 384,
  postsCount: 42,
};

export const BRAND_LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1U1_7R8Twkw4EdFS7nFyh8Gf12Czp0ZFr3dDgdo5Q1yWWKuCDlUiXK9yi0Ril9z8lH60hPycagfNWhCi9EBBrYgnV6xaPnfrvQuAw7shdUBdI4TwTS4mY5qbpIjeIy0BCiQzFmY1U_gCPTwaOnBPWCl1wFlYKaX4fObJX_wh0qGuO8waogiVFmgzanXGHksSzcgXIRb7wqzon0oOr6QKexBUjJmanz8zraBsAfwt4FUAgjP2m8V6ABZ6fSn';

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story_user',
    userId: 'user_alex',
    username: 'Your story',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwGaJZxw9CioMrybdGYzydiIpE1ooQNt05DEfYqPVK9cjH0z14g-AV_R_xGyaume4oPuCUPZW1A8RgHstMYpi2nTLOIAnB84OYeP2gNqLrdrYh7A_bxQjL15F134AQt61rKRJBGGmswkPzJvwPReGp76mHQtucehNcATrHuZg4V0UctukAN8yaEp2r0yuHReUHUAKsLz5bmdcvvAqui6SZBpDjba5DlPdfYKhTa7FX9n6jiClw0Zee6A',
    hasUnseen: false,
    slides: [
      {
        id: 's0_1',
        mediaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBepXSDesuAAoAxsp6UjiapKX2oKF25KtSGXsAU6SzCqM3_HWWl3hUEaWzTzdYh_QAUsP6PXvz6f6BYup1q_UKQocZSdLnni_ylYnlUVNyhurCW6QJxxkm2__fwVRG2QeIuJVA0TjiFsZZRRdwpWBfXEQd47fz2qKmxF6YWoMt8iUhV7E3SsCSSDxSfYI3AnNqk2po5M8rKwfhjjL4Ej5UrMP_V5qdwewji-bmVOwyIzMlpL2d0wgP1Rg',
        caption: 'Morning light test on Portra 400 ✨',
        timestamp: 'Just now',
        tag: 'Golden Gate Lookout',
      }
    ]
  },
  {
    id: 'story_elena',
    userId: 'user_elena',
    username: 'elena.lens',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeC4jRZiSCZlrfb5hAkYKPHVWVJSm6uPMotAmPkeAYcF4q1U3j0uyFCHEqzDhttSw-rfErdq7UW02u6XthZSDZ38UxOKBoLPxUNLiR9cJ8oMt61eM2s1ff7lzqjf3zhbUj6lZT_esOlS_bZHmVtjo45aVlKOupRop6WmlEFUlKQoSl8NNlCSXb0nAcwSpjK_4CXtnpRSye2FNy-nCkl8mzW9sZTvd0DkmKUBlwGymf17Kpf-dgPTDkQA',
    hasUnseen: true,
    slides: [
      {
        id: 's1_1',
        mediaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBepXSDesuAAoAxsp6UjiapKX2oKF25KtSGXsAU6SzCqM3_HWWl3hUEaWzTzdYh_QAUsP6PXvz6f6BYup1q_UKQocZSdLnni_ylYnlUVNyhurCW6QJxxkm2__fwVRG2QeIuJVA0TjiFsZZRRdwpWBfXEQd47fz2qKmxF6YWoMt8iUhV7E3SsCSSDxSfYI3AnNqk2po5M8rKwfhjjL4Ej5UrMP_V5qdwewji-bmVOwyIzMlpL2d0wgP1Rg',
        caption: 'Dusk settling over Marin Headlands 🌅',
        timestamp: '2h ago',
        tag: '35mm Portra 400',
      },
      {
        id: 's1_2',
        mediaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6KeLdYzo98z7k41m8II-BMeRbtTp_tokys4NECHnSooGeE0CzWVsKcg8HmBx2PWXo6RrxBUPs5mv-75xH-sbpbQh8bFt0FH4rS-o_6dY_OFQXgE-Yc3238fp6Q2-HiutyxJgwUD6PNhumtwER6WKvPnnF6om9vm4bsxRNHI6_LUsR8l-5hjrljZq3erTOpGInseOTpMjOTaJu22M95v4khsWflmGHUbVErVse_5vd5r4g2hnQvguFbA',
        caption: 'Darkroom prints drying up nicely',
        timestamp: '1h ago',
        tag: 'Studio Darkroom',
      }
    ]
  },
  {
    id: 'story_marcus',
    userId: 'user_marcus',
    username: 'marcus_vibe',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_nuWglLGdsxII3Kud7SEYH7Giy4-eR0bVnTzTxKS1S1uzKP3ucKT-BpwJuwmWovzPXaSDZTMeH0wqWbxAmqvOyyOgM04UYmleqNLV_UxUZn5mcvRxFxWdOfBVUIzqRiSe0SZxK2tB-ziyPEuc63mfg8pP1plyRK6DHpWd6CmisihQ91YKrJbVsSLU9-KR2lBonUEfNYYGK7yjkTjSJti6XqNxmBcnLMCDD5pOmpcsymqTzRc-h5zYbg',
    isLive: true,
    hasUnseen: true,
    slides: [
      {
        id: 's2_1',
        mediaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqjFvlSRSsJC9DsedoTGIRlj_TKLRgqgMnK_VO2Osiu5zJw0Pg0rZ7EhVv7xDaG5tFvLMxhiDbE_P8xYzWe1DFS0oKvwSb-OY05z-Y70rhkzyRWvGblW8D5wD2jyAK172CbTlXm5vy0a6JNyKcMiuKAxkjpnZBW-leOPcSZh4EwI8Fz_aqcyenFOIm6BXlBpADxejSLHhoGhQ6dKL5G4Q-BT1XJNro8tEQHc5RYyYFMe02D9F2w_YCSg',
        caption: '🔴 LIVE: Late night modular synth jam session',
        timestamp: 'LIVE NOW',
        tag: 'Tokyo Underground Studio',
      }
    ]
  },
  {
    id: 'story_sora',
    userId: 'user_sora',
    username: 'sora.tokyo',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7nzOpccOUECQD3aU4UQ4b3MpnND8reaShDwHPcjdb50JkQUXpz95ePLwCnmh1Q4AtJ9TjZDU8IVlQTw6dyp8nf2J7wP_6fN-B9Y4j_x4JsYjpTCk9iDK9qC4Fl1ELrM4p604CHoAhl5zeA8ow5LJso_J1JbLBkmC9Ryj3tSVFuZmkMo828m1EF_SvRf8vSs8q4wPAoXKeTFGptNVmWffwU96nSQ8LQXjgRRdOT8mo5GGAE9AIbKvHOQ',
    hasUnseen: true,
    slides: [
      {
        id: 's3_1',
        mediaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqjFvlSRSsJC9DsedoTGIRlj_TKLRgqgMnK_VO2Osiu5zJw0Pg0rZ7EhVv7xDaG5tFvLMxhiDbE_P8xYzWe1DFS0oKvwSb-OY05z-Y70rhkzyRWvGblW8D5wD2jyAK172CbTlXm5vy0a6JNyKcMiuKAxkjpnZBW-leOPcSZh4EwI8Fz_aqcyenFOIm6BXlBpADxejSLHhoGhQ6dKL5G4Q-BT1XJNro8tEQHc5RYyYFMe02D9F2w_YCSg',
        caption: 'Shibuya neon rain reflections ☔',
        timestamp: '4h ago',
        tag: 'Shibuya Crossing',
      }
    ]
  },
  {
    id: 'story_arch',
    userId: 'user_arch',
    username: 'studio_arch',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9L9ejr-UHi6xXF3CvWPe1V0-98sUHaAySu_b26forybTRErMIAF4R0VqPvIlL2D5EOOxRalUStBtEW0W3DEZIfwmx4JIF8_t2r21amS1fJfsqbGuKf2M_0F6Zwc4n_kFUspIeTAcHh1C8v3GI7WlLTznjdWgRtalCzh682C4XO2LoEaTcU_kRV_e15han_R66uHdDrcoR4hN5C2lYsVt79_NQxZbTGwzDS4dpbuq53oPwyt2MplijVA',
    hasUnseen: true,
    slides: [
      {
        id: 's4_1',
        mediaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6KeLdYzo98z7k41m8II-BMeRbtTp_tokys4NECHnSooGeE0CzWVsKcg8HmBx2PWXo6RrxBUPs5mv-75xH-sbpbQh8bFt0FH4rS-o_6dY_OFQXgE-Yc3238fp6Q2-HiutyxJgwUD6PNhumtwER6WKvPnnF6om9vm4bsxRNHI6_LUsR8l-5hjrljZq3erTOpGInseOTpMjOTaJu22M95v4khsWflmGHUbVErVse_5vd5r4g2hnQvguFbA',
        caption: 'Travertine samples arrived for the Copenhagen loft',
        timestamp: '6h ago',
        tag: 'Copenhagen Material Lab',
      }
    ]
  },
  {
    id: 'story_clara',
    userId: 'user_clara',
    username: 'clara_sound',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX36WN8cxI4OBpg2PO10J7hdgpilezaQEgAIpxGNJy6lea7eoCIwMZ6B_Udk38qc9sAhngr8WgKwTUfiVQGGGA0CjpFBJ0CFRNeMhP1wufrzAGzZJAoJqL7FM6LtzivlvwcIydvjXtkD6yM-vS0-mtW0zOGRnOZKHXvzlkkwy91fZ53PDlTx2I9xgHk4Zd2l71PdOJwzgdMxMFM5LWnH5IogKxRd6rqtxHMheSFOKbhOqYKhqeLfgSUA',
    hasUnseen: true,
    slides: [
      {
        id: 's5_1',
        mediaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBepXSDesuAAoAxsp6UjiapKX2oKF25KtSGXsAU6SzCqM3_HWWl3hUEaWzTzdYh_QAUsP6PXvz6f6BYup1q_UKQocZSdLnni_ylYnlUVNyhurCW6QJxxkm2__fwVRG2QeIuJVA0TjiFsZZRRdwpWBfXEQd47fz2qKmxF6YWoMt8iUhV7E3SsCSSDxSfYI3AnNqk2po5M8rKwfhjjL4Ej5UrMP_V5qdwewji-bmVOwyIzMlpL2d0wgP1Rg',
        caption: 'Recording ambient acoustics at dawn 🎶',
        timestamp: '7h ago',
        tag: 'Soundscape Lab',
      }
    ]
  },
  {
    id: 'story_devon',
    userId: 'user_devon',
    username: 'devon.art',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJl8q7ggjoOCeqq6cgRd1ck_cT1eYpFBoBldEAXDUHo3DhXierGE39jujHr04mKi0MHxIkrubFPLlwkUGX-n3CXmBQwESdyHB8hTuLEQyp1HKToDCxwEgDln6AOPDnxdw5ySIyniZuSyVNKlsbMHa-QkfyOammPNF7bjJX74dnIv_i02Sm5l96xbR_IUf4RT1aeyj4R6F6kx1O8I_XxWZLfXeUcS4YSFiuzNd5g4ocnpmpFiRXTXGXnw',
    hasUnseen: false,
    slides: [
      {
        id: 's6_1',
        mediaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6KeLdYzo98z7k41m8II-BMeRbtTp_tokys4NECHnSooGeE0CzWVsKcg8HmBx2PWXo6RrxBUPs5mv-75xH-sbpbQh8bFt0FH4rS-o_6dY_OFQXgE-Yc3238fp6Q2-HiutyxJgwUD6PNhumtwER6WKvPnnF6om9vm4bsxRNHI6_LUsR8l-5hjrljZq3erTOpGInseOTpMjOTaJu22M95v4khsWflmGHUbVErVse_5vd5r4g2hnQvguFbA',
        caption: 'Charcoal sketches under natural light 🖌️',
        timestamp: '10h ago',
        tag: 'Atelier Berlin',
      }
    ]
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post_1',
    author: {
      id: 'user_elena',
      username: 'elena.lens',
      name: 'Elena Rostova',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjfUDqxAiHlex-PTWUDSP0FQFXbfpFzZCCtQhy9cWw7rac6wSjm0CjKiopxnYPCevYknDPlutYxIRMHFCBBqYQYEqz0kP3YacJjBMzUnmC1mJxRtimlet6UqvtxWGzVv9QKqmrcSoy8I1ocaTt-TeJ6_euXhs3n8ANhZiftb-Y7xqUBvOPpNrQAZkGazPV9_vOTOwhVkgTQL-xCV43NIsxXK-nlx5jL86XVSJzxCpfTzTIV0qyt0XYBA',
      verified: true,
    },
    location: 'Pacific Heights, San Francisco',
    cameraTag: 'Contax G2 • 35mm',
    timestamp: '2h',
    type: 'image',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBepXSDesuAAoAxsp6UjiapKX2oKF25KtSGXsAU6SzCqM3_HWWl3hUEaWzTzdYh_QAUsP6PXvz6f6BYup1q_UKQocZSdLnni_ylYnlUVNyhurCW6QJxxkm2__fwVRG2QeIuJVA0TjiFsZZRRdwpWBfXEQd47fz2qKmxF6YWoMt8iUhV7E3SsCSSDxSfYI3AnNqk2po5M8rKwfhjjL4Ej5UrMP_V5qdwewji-bmVOwyIzMlpL2d0wgP1Rg'
    ],
    likesCount: 4821,
    isLiked: false,
    isBookmarked: false,
    caption: 'Chasing the last rays across the Pacific ridge 🌅 Shot on 35mm film. The transition from golden amber to cool marine fog never gets old.',
    hashtags: ['#35mmfilm', '#GoldenHour', '#SanFrancisco', '#AnalogVibes'],
    likersSample: [
      { initials: 'J', bgClass: 'bg-primary-fixed', textClass: 'text-on-primary-fixed' },
      { initials: 'M', bgClass: 'bg-secondary-fixed', textClass: 'text-on-secondary-fixed' }
    ],
    commentsCount: 128,
    comments: [
      {
        id: 'c1',
        username: 'kai_visuals',
        userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlpjDM_EcfzYt196ICsTkaiBU_svvldwGxQQNEZzQh-7E6H_5DYKajtFiHUgLjdLiZ8Ec7V7zsS8lPhKrOX71pTtxIqnv7-9ccF4LLWBC1-ViOA4jGWT5v-itw4pU7P0FeBwQ6cJ_Wx4v7Q4dpyzcuL38Rqn6TGDNZz717f5Vu-nyM03UiSx5u6ROer7J_gG4Y1xqrQEhWgSj02PvGz4znoDKFSQyMUfFp-rXbBkJnv4teWR1NUo_6Pg',
        text: 'That grain structure on the eucalyptus leaves is pure magic!',
        timestamp: '1h ago',
        likesCount: 14,
        isLiked: false,
      },
      {
        id: 'c2',
        username: 'oliver.film',
        userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9gDf0x0LG8qbY2CfjUBWC_-A9JKxVFUtlUcjkSGMVITf6lj54jHzK7N8FMxbfeA_qfxPDEuFoS4KY2phVliyuwxtqrpOdnIZLdoN26--r7nEZfmXuIEKo1PS1yAX-hWrIqwVj-xIjSBV0EA12MWtcT0OPngD_uujvNxWVh9LOKjCiFwxodtd4KOnAK4aVkBUhm4N-QRZ1aA_eyDqr4XmSjL5zk8IRK3v6vY8AT1MOFGSSbjl2T55uEg',
        text: 'Did you push the Portra 400 one stop here?',
        timestamp: '45m ago',
        likesCount: 6,
        isLiked: false,
      }
    ]
  },
  {
    id: 'post_2',
    author: {
      id: 'user_arch',
      username: 'studio_arch',
      name: 'Studio Arch',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvCvecMJTSZoMgRG6l0RjTjTHypUMtcfbDYGmH5wzGDL7SZh--yNMNcD_cZ7wr-fi_XPkdJqSl5cpEfy_6IwF4NvkVsQIKzAvUOrFXa1PcL2x_Eq32PYoKPslyjSm6C1D_baJGz9iKlNylcB7Y2-oWrw0mlTxtabezUKWG8pXG8F0-6T6WCEg3TqBhrFhHn9vUWlhtRdWAqWauK_6nSBMhBUzpMpUuXb8vtVlNBAOXpT1S49AqJU1wTg',
      verified: true,
      isFollowing: false,
    },
    location: 'Copenhagen, Denmark',
    timestamp: '5h',
    type: 'carousel',
    currentSlide: 0,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA6KeLdYzo98z7k41m8II-BMeRbtTp_tokys4NECHnSooGeE0CzWVsKcg8HmBx2PWXo6RrxBUPs5mv-75xH-sbpbQh8bFt0FH4rS-o_6dY_OFQXgE-Yc3238fp6Q2-HiutyxJgwUD6PNhumtwER6WKvPnnF6om9vm4bsxRNHI6_LUsR8l-5hjrljZq3erTOpGInseOTpMjOTaJu22M95v4khsWflmGHUbVErVse_5vd5r4g2hnQvguFbA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBepXSDesuAAoAxsp6UjiapKX2oKF25KtSGXsAU6SzCqM3_HWWl3hUEaWzTzdYh_QAUsP6PXvz6f6BYup1q_UKQocZSdLnni_ylYnlUVNyhurCW6QJxxkm2__fwVRG2QeIuJVA0TjiFsZZRRdwpWBfXEQd47fz2qKmxF6YWoMt8iUhV7E3SsCSSDxSfYI3AnNqk2po5M8rKwfhjjL4Ej5UrMP_V5qdwewji-bmVOwyIzMlpL2d0wgP1Rg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCqjFvlSRSsJC9DsedoTGIRlj_TKLRgqgMnK_VO2Osiu5zJw0Pg0rZ7EhVv7xDaG5tFvLMxhiDbE_P8xYzWe1DFS0oKvwSb-OY05z-Y70rhkzyRWvGblW8D5wD2jyAK172CbTlXm5vy0a6JNyKcMiuKAxkjpnZBW-leOPcSZh4EwI8Fz_aqcyenFOIm6BXlBpADxejSLHhoGhQ6dKL5G4Q-BT1XJNro8tEQHc5RYyYFMe02D9F2w_YCSg'
    ],
    likesCount: 12410,
    isLiked: false,
    isBookmarked: false,
    caption: 'Designing light before designing walls. Which layout feels more balanced to you? 🤍 We opted for monolithic lime plaster to soften morning reflections.',
    hashtags: ['#architecture', '#minimal', '#interiorDesign', '#copenhagen'],
    pinnedComment: {
      id: 'pin_1',
      username: 'kai_visuals',
      text: 'The natural lighting in slide 2 is unreal 🔥 especially with that recessed shadow gap.',
      timestamp: '4h ago',
      isPinned: true,
      likesCount: 89,
      isLiked: false,
    },
    commentsCount: 94,
    comments: [
      {
        id: 'c3',
        username: 'nordic_spaces',
        userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG9DsuhX53JEdEmr38kgFQp5HRw6Z1zybLEAuiT-W0Nx9UeC5SVyTpJfW9t8_xdbIm6oomX4svBmxhfPb2BgK4ZMB2NGegfSY5_gFqSnQPYWFVVjI9DbcCxD34n74s0r_jQVMUhp0Fs27-zcFZ8zZKBdYasNS9MK-xvvseavzC7fc3EHSNBTFdlwMtKNFPhqjYqgFJQfJQ7msVqu3I1d2YgECIzsPHXcsjlORA2VF_q4eimWQQEzG0xQ',
        text: 'The warm oak chevron pairs exceptionally well with raw concrete.',
        timestamp: '3h ago',
        likesCount: 22,
        isLiked: false,
      }
    ]
  },
  {
    id: 'post_3',
    author: {
      id: 'user_sora',
      username: 'sora.tokyo',
      name: 'Sora Takahashi',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7viTs1c8I76rGtzeQaKqBmvu-1xRqJXN3SrmPOtpLUKNw5AT-YUyjJQ378ZcNr-jfQ5S0kK5H07_Y19ILJ65JPVtCkFfbjHcHXHfdnRseZYXCRWsipuu0PjtSByBOSnKSBB5MISCtlhxozRIkb4jvSdLdRDV_wLGv8N9QkIyxrsdbfw3kcmoQJ_Yn3fw1e1QRQ6qqA2PiAuJEGQWm_RcFutu_EWxwe6-p6LaTWCgWqZTs7Q-WDiDM6g',
      verified: true,
    },
    location: 'Shibuya Crossing, Tokyo',
    timestamp: '8h',
    type: 'reel',
    videoPoster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqjFvlSRSsJC9DsedoTGIRlj_TKLRgqgMnK_VO2Osiu5zJw0Pg0rZ7EhVv7xDaG5tFvLMxhiDbE_P8xYzWe1DFS0oKvwSb-OY05z-Y70rhkzyRWvGblW8D5wD2jyAK172CbTlXm5vy0a6JNyKcMiuKAxkjpnZBW-leOPcSZh4EwI8Fz_aqcyenFOIm6BXlBpADxejSLHhoGhQ6dKL5G4Q-BT1XJNro8tEQHc5RYyYFMe02D9F2w_YCSg',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCqjFvlSRSsJC9DsedoTGIRlj_TKLRgqgMnK_VO2Osiu5zJw0Pg0rZ7EhVv7xDaG5tFvLMxhiDbE_P8xYzWe1DFS0oKvwSb-OY05z-Y70rhkzyRWvGblW8D5wD2jyAK172CbTlXm5vy0a6JNyKcMiuKAxkjpnZBW-leOPcSZh4EwI8Fz_aqcyenFOIm6BXlBpADxejSLHhoGhQ6dKL5G4Q-BT1XJNro8tEQHc5RYyYFMe02D9F2w_YCSg'
    ],
    reelViews: '84.2K views',
    audioTrack: 'Original Audio - sora.tokyo • Synth Dreams',
    likesCount: 19834,
    isLiked: false,
    isBookmarked: false,
    caption: 'Midnight drift through Shibuya during typhoon season ☔️ Turn sound on for the city rhythm.',
    hashtags: ['#TokyoNights', '#Cinematic', '#Shibuya', '#CyberVibe'],
    commentsCount: 341,
    comments: [
      {
        id: 'c4',
        username: 'maya.beats',
        userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiJJQYVvTND7ilOsIWdeCljzxLS6b-Uae6u5zxXGZ1SZgFT8uaV7pbJK1fcwR7v_wfSxXnyL6TgrxemRdnGCon0s7BqKGC7BIQlTuqe3M1qu59L3SGGQFG8clHNkreujDmqJQ0wKBYLQB0cJKjYOaheMEGyTdrQnlimIS0s_qlH8bgZIVjVPqjsUbRVhBnVvGKIS8FanM_MoVP52W-uHg66zCcdVnxHFw65HrkwWIHq2B3-DyI1mlGSA',
        text: 'The bass drop when the umbrella opened gave me chills!',
        timestamp: '6h ago',
        likesCount: 47,
        isLiked: false,
      }
    ]
  }
];

export const SUGGESTED_USERS: User[] = [
  {
    id: 'user_kai',
    username: 'kai_visuals',
    name: 'Kai visual artist',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlpjDM_EcfzYt196ICsTkaiBU_svvldwGxQQNEZzQh-7E6H_5DYKajtFiHUgLjdLiZ8Ec7V7zsS8lPhKrOX71pTtxIqnv7-9ccF4LLWBC1-ViOA4jGWT5v-itw4pU7P0FeBwQ6cJ_Wx4v7Q4dpyzcuL38Rqn6TGDNZz717f5Vu-nyM03UiSx5u6ROer7J_gG4Y1xqrQEhWgSj02PvGz4znoDKFSQyMUfFp-rXbBkJnv4teWR1NUo_6Pg',
    bio: 'Followed by elena.lens + 4 others',
    isFollowing: false,
  },
  {
    id: 'user_maya',
    username: 'maya.beats',
    name: 'Maya Chen',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiJJQYVvTND7ilOsIWdeCljzxLS6b-Uae6u5zxXGZ1SZgFT8uaV7pbJK1fcwR7v_wfSxXnyL6TgrxemRdnGCon0s7BqKGC7BIQlTuqe3M1qu59L3SGGQFG8clHNkreujDmqJQ0wKBYLQB0cJKjYOaheMEGyTdrQnlimIS0s_qlH8bgZIVjVPqjsUbRVhBnVvGKIS8FanM_MoVP52W-uHg66zCcdVnxHFw65HrkwWIHq2B3-DyI1mlGSA',
    bio: 'Followed by clara_sound + 12 others',
    isFollowing: false,
  },
  {
    id: 'user_nordic',
    username: 'nordic_spaces',
    name: 'Nordic Spaces',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG9DsuhX53JEdEmr38kgFQp5HRw6Z1zybLEAuiT-W0Nx9UeC5SVyTpJfW9t8_xdbIm6oomX4svBmxhfPb2BgK4ZMB2NGegfSY5_gFqSnQPYWFVVjI9DbcCxD34n74s0r_jQVMUhp0Fs27-zcFZ8zZKBdYasNS9MK-xvvseavzC7fc3EHSNBTFdlwMtKNFPhqjYqgFJQfJQ7msVqu3I1d2YgECIzsPHXcsjlORA2VF_q4eimWQQEzG0xQ',
    bio: 'Suggested based on your interests',
    isFollowing: false,
  },
  {
    id: 'user_oliver',
    username: 'oliver.film',
    name: 'Oliver Vance',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9gDf0x0LG8qbY2CfjUBWC_-A9JKxVFUtlUcjkSGMVITf6lj54jHzK7N8FMxbfeA_qfxPDEuFoS4KY2phVliyuwxtqrpOdnIZLdoN26--r7nEZfmXuIEKo1PS1yAX-hWrIqwVj-xIjSBV0EA12MWtcT0OPngD_uujvNxWVh9LOKjCiFwxodtd4KOnAK4aVkBUhm4N-QRZ1aA_eyDqr4XmSjL5zk8IRK3v6vY8AT1MOFGSSbjl2T55uEg',
    bio: 'Follows you',
    isFollowing: false,
  }
];

export const TRENDING_TAGS = [
  { tag: '#35mmfilm', count: '142.8K posts' },
  { tag: '#GoldenHour', count: '98.4K posts' },
  { tag: '#MinimalArchitecture', count: '61.2K posts' },
  { tag: '#IndieDev', count: '45.0K posts' },
  { tag: '#TokyoNights', count: '38.9K posts' },
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_1',
    user: {
      id: 'user_elena',
      username: 'elena.lens',
      name: 'Elena Rostova',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeC4jRZiSCZlrfb5hAkYKPHVWVJSm6uPMotAmPkeAYcF4q1U3j0uyFCHEqzDhttSw-rfErdq7UW02u6XthZSDZ38UxOKBoLPxUNLiR9cJ8oMt61eM2s1ff7lzqjf3zhbUj6lZT_esOlS_bZHmVtjo45aVlKOupRop6WmlEFUlKQoSl8NNlCSXb0nAcwSpjK_4CXtnpRSye2FNy-nCkl8mzW9sZTvd0DkmKUBlwGymf17Kpf-dgPTDkQA',
      verified: true,
    },
    lastMessage: 'Are we still shooting at Baker Beach this Thursday?',
    timestamp: '12m ago',
    unreadCount: 1,
    online: true,
    messages: [
      { id: 'm1', senderId: 'user_elena', text: 'Hey Alex! Loved your latest Contax photos from Lands End.', timestamp: '10:14 AM', isRead: true },
      { id: 'm2', senderId: 'user_alex', text: 'Thanks Elena! The light was unbelievable right after the marine layer broke.', timestamp: '10:18 AM', isRead: true },
      { id: 'm3', senderId: 'user_elena', text: 'Are we still shooting at Baker Beach this Thursday?', timestamp: '10:24 AM', isRead: false },
    ]
  },
  {
    id: 'conv_2',
    user: {
      id: 'user_marcus',
      username: 'marcus_vibe',
      name: 'Marcus Vibe',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_nuWglLGdsxII3Kud7SEYH7Giy4-eR0bVnTzTxKS1S1uzKP3ucKT-BpwJuwmWovzPXaSDZTMeH0wqWbxAmqvOyyOgM04UYmleqNLV_UxUZn5mcvRxFxWdOfBVUIzqRiSe0SZxK2tB-ziyPEuc63mfg8pP1plyRK6DHpWd6CmisihQ91YKrJbVsSLU9-KR2lBonUEfNYYGK7yjkTjSJti6XqNxmBcnLMCDD5pOmpcsymqTzRc-h5zYbg',
      verified: false,
    },
    lastMessage: 'Dropped the master stem in your Drive folder!',
    timestamp: '2h ago',
    unreadCount: 2,
    online: true,
    messages: [
      { id: 'm4', senderId: 'user_marcus', text: 'Alex, finished mastering that synth backdrop for the Tokyo reel.', timestamp: '8:40 AM', isRead: true },
      { id: 'm5', senderId: 'user_marcus', text: 'Dropped the master stem in your Drive folder!', timestamp: '8:41 AM', isRead: false }
    ]
  },
  {
    id: 'conv_3',
    user: {
      id: 'user_arch',
      username: 'studio_arch',
      name: 'Studio Arch',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvCvecMJTSZoMgRG6l0RjTjTHypUMtcfbDYGmH5wzGDL7SZh--yNMNcD_cZ7wr-fi_XPkdJqSl5cpEfy_6IwF4NvkVsQIKzAvUOrFXa1PcL2x_Eq32PYoKPslyjSm6C1D_baJGz9iKlNylcB7Y2-oWrw0mlTxtabezUKWG8pXG8F0-6T6WCEg3TqBhrFhHn9vUWlhtRdWAqWauK_6nSBMhBUzpMpUuXb8vtVlNBAOXpT1S49AqJU1wTg',
      verified: true,
    },
    lastMessage: 'The editorial spreads look stunning.',
    timestamp: 'Yesterday',
    unreadCount: 0,
    online: false,
    messages: [
      { id: 'm6', senderId: 'user_arch', text: 'The editorial spreads look stunning.', timestamp: 'Yesterday', isRead: true }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'like',
    user: {
      id: 'user_elena',
      username: 'elena.lens',
      name: 'Elena Rostova',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeC4jRZiSCZlrfb5hAkYKPHVWVJSm6uPMotAmPkeAYcF4q1U3j0uyFCHEqzDhttSw-rfErdq7UW02u6XthZSDZ38UxOKBoLPxUNLiR9cJ8oMt61eM2s1ff7lzqjf3zhbUj6lZT_esOlS_bZHmVtjo45aVlKOupRop6WmlEFUlKQoSl8NNlCSXb0nAcwSpjK_4CXtnpRSye2FNy-nCkl8mzW9sZTvd0DkmKUBlwGymf17Kpf-dgPTDkQA',
    },
    text: 'liked your photo "Golden Hour Ridge Hike"',
    timestamp: '15m ago',
    targetMedia: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBepXSDesuAAoAxsp6UjiapKX2oKF25KtSGXsAU6SzCqM3_HWWl3hUEaWzTzdYh_QAUsP6PXvz6f6BYup1q_UKQocZSdLnni_ylYnlUVNyhurCW6QJxxkm2__fwVRG2QeIuJVA0TjiFsZZRRdwpWBfXEQd47fz2qKmxF6YWoMt8iUhV7E3SsCSSDxSfYI3AnNqk2po5M8rKwfhjjL4Ej5UrMP_V5qdwewji-bmVOwyIzMlpL2d0wgP1Rg',
    isRead: false,
  },
  {
    id: 'notif_2',
    type: 'live',
    user: {
      id: 'user_marcus',
      username: 'marcus_vibe',
      name: 'Marcus Vibe',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_nuWglLGdsxII3Kud7SEYH7Giy4-eR0bVnTzTxKS1S1uzKP3ucKT-BpwJuwmWovzPXaSDZTMeH0wqWbxAmqvOyyOgM04UYmleqNLV_UxUZn5mcvRxFxWdOfBVUIzqRiSe0SZxK2tB-ziyPEuc63mfg8pP1plyRK6DHpWd6CmisihQ91YKrJbVsSLU9-KR2lBonUEfNYYGK7yjkTjSJti6XqNxmBcnLMCDD5pOmpcsymqTzRc-h5zYbg',
    },
    text: 'is now live: "Late night modular synth jam"',
    timestamp: '42m ago',
    isRead: false,
  },
  {
    id: 'notif_3',
    type: 'comment',
    user: {
      id: 'user_kai',
      username: 'kai_visuals',
      name: 'Kai visual artist',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlpjDM_EcfzYt196ICsTkaiBU_svvldwGxQQNEZzQh-7E6H_5DYKajtFiHUgLjdLiZ8Ec7V7zsS8lPhKrOX71pTtxIqnv7-9ccF4LLWBC1-ViOA4jGWT5v-itw4pU7P0FeBwQ6cJ_Wx4v7Q4dpyzcuL38Rqn6TGDNZz717f5Vu-nyM03UiSx5u6ROer7J_gG4Y1xqrQEhWgSj02PvGz4znoDKFSQyMUfFp-rXbBkJnv4teWR1NUo_6Pg',
    },
    text: 'commented: "The natural lighting in slide 2 is unreal 🔥"',
    timestamp: '2h ago',
    targetMedia: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6KeLdYzo98z7k41m8II-BMeRbtTp_tokys4NECHnSooGeE0CzWVsKcg8HmBx2PWXo6RrxBUPs5mv-75xH-sbpbQh8bFt0FH4rS-o_6dY_OFQXgE-Yc3238fp6Q2-HiutyxJgwUD6PNhumtwER6WKvPnnF6om9vm4bsxRNHI6_LUsR8l-5hjrljZq3erTOpGInseOTpMjOTaJu22M95v4khsWflmGHUbVErVse_5vd5r4g2hnQvguFbA',
    isRead: false,
  },
  {
    id: 'notif_4',
    type: 'follow',
    user: {
      id: 'user_oliver',
      username: 'oliver.film',
      name: 'Oliver Vance',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9gDf0x0LG8qbY2CfjUBWC_-A9JKxVFUtlUcjkSGMVITf6lj54jHzK7N8FMxbfeA_qfxPDEuFoS4KY2phVliyuwxtqrpOdnIZLdoN26--r7nEZfmXuIEKo1PS1yAX-hWrIqwVj-xIjSBV0EA12MWtcT0OPngD_uujvNxWVh9LOKjCiFwxodtd4KOnAK4aVkBUhm4N-QRZ1aA_eyDqr4XmSjL5zk8IRK3v6vY8AT1MOFGSSbjl2T55uEg',
    },
    text: 'started following your creative portfolio.',
    timestamp: '5h ago',
    isRead: true,
  }
];

export const EXPLORE_POSTS = [
  {
    id: 'exp_1',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBepXSDesuAAoAxsp6UjiapKX2oKF25KtSGXsAU6SzCqM3_HWWl3hUEaWzTzdYh_QAUsP6PXvz6f6BYup1q_UKQocZSdLnni_ylYnlUVNyhurCW6QJxxkm2__fwVRG2QeIuJVA0TjiFsZZRRdwpWBfXEQd47fz2qKmxF6YWoMt8iUhV7E3SsCSSDxSfYI3AnNqk2po5M8rKwfhjjL4Ej5UrMP_V5qdwewji-bmVOwyIzMlpL2d0wgP1Rg',
    category: 'Photography',
    author: 'elena.lens',
    likes: '4.8K',
    comments: '128',
    aspect: 'aspect-[4/5]',
    title: 'Pacific Coast Ridge',
  },
  {
    id: 'exp_2',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6KeLdYzo98z7k41m8II-BMeRbtTp_tokys4NECHnSooGeE0CzWVsKcg8HmBx2PWXo6RrxBUPs5mv-75xH-sbpbQh8bFt0FH4rS-o_6dY_OFQXgE-Yc3238fp6Q2-HiutyxJgwUD6PNhumtwER6WKvPnnF6om9vm4bsxRNHI6_LUsR8l-5hjrljZq3erTOpGInseOTpMjOTaJu22M95v4khsWflmGHUbVErVse_5vd5r4g2hnQvguFbA',
    category: 'Architecture',
    author: 'studio_arch',
    likes: '12.4K',
    comments: '94',
    aspect: 'aspect-square',
    title: 'Monolithic Concrete Loft',
  },
  {
    id: 'exp_3',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqjFvlSRSsJC9DsedoTGIRlj_TKLRgqgMnK_VO2Osiu5zJw0Pg0rZ7EhVv7xDaG5tFvLMxhiDbE_P8xYzWe1DFS0oKvwSb-OY05z-Y70rhkzyRWvGblW8D5wD2jyAK172CbTlXm5vy0a6JNyKcMiuKAxkjpnZBW-leOPcSZh4EwI8Fz_aqcyenFOIm6BXlBpADxejSLHhoGhQ6dKL5G4Q-BT1XJNro8tEQHc5RYyYFMe02D9F2w_YCSg',
    category: 'Reels',
    author: 'sora.tokyo',
    likes: '19.8K',
    comments: '341',
    aspect: 'aspect-[9/16]',
    title: 'Shibuya Rain Drift',
  },
  {
    id: 'exp_4',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeC4jRZiSCZlrfb5hAkYKPHVWVJSm6uPMotAmPkeAYcF4q1U3j0uyFCHEqzDhttSw-rfErdq7UW02u6XthZSDZ38UxOKBoLPxUNLiR9cJ8oMt61eM2s1ff7lzqjf3zhbUj6lZT_esOlS_bZHmVtjo45aVlKOupRop6WmlEFUlKQoSl8NNlCSXb0nAcwSpjK_4CXtnpRSye2FNy-nCkl8mzW9sZTvd0DkmKUBlwGymf17Kpf-dgPTDkQA',
    category: 'Portraits',
    author: 'elena.lens',
    likes: '8.3K',
    comments: '112',
    aspect: 'aspect-square',
    title: 'Golden Lens Portrait',
  },
  {
    id: 'exp_5',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJl8q7ggjoOCeqq6cgRd1ck_cT1eYpFBoBldEAXDUHo3DhXierGE39jujHr04mKi0MHxIkrubFPLlwkUGX-n3CXmBQwESdyHB8hTuLEQyp1HKToDCxwEgDln6AOPDnxdw5ySIyniZuSyVNKlsbMHa-QkfyOammPNF7bjJX74dnIv_i02Sm5l96xbR_IUf4RT1aeyj4R6F6kx1O8I_XxWZLfXeUcS4YSFiuzNd5g4ocnpmpFiRXTXGXnw',
    category: 'Art & Studio',
    author: 'devon.art',
    likes: '6.7K',
    comments: '58',
    aspect: 'aspect-[4/5]',
    title: 'Charcoal in Sunlit Atelier',
  },
  {
    id: 'exp_6',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX36WN8cxI4OBpg2PO10J7hdgpilezaQEgAIpxGNJy6lea7eoCIwMZ6B_Udk38qc9sAhngr8WgKwTUfiVQGGGA0CjpFBJ0CFRNeMhP1wufrzAGzZJAoJqL7FM6LtzivlvwcIydvjXtkD6yM-vS0-mtW0zOGRnOZKHXvzlkkwy91fZ53PDlTx2I9xgHk4Zd2l71PdOJwzgdMxMFM5LWnH5IogKxRd6rqtxHMheSFOKbhOqYKhqeLfgSUA',
    category: 'Sound & Music',
    author: 'clara_sound',
    likes: '5.1K',
    comments: '77',
    aspect: 'aspect-square',
    title: 'Acoustic Harmonics Lab',
  }
];
