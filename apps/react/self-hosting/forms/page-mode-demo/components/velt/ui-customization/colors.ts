const Neutral = {
    p4: "#F9FAFE",
    p5: "#F8FAFF",
    p10: "#F2F6FC",
    p20: "#EDF0F8",
    p30: "#DDE3EE",
    p40: "#BFC8DC",
    p50: "#9AA8C3",
    p60: "#7E8DA9",
    p70: "#5C6C8A",
    p80: "#465169",
    p90: "#172026",
    p100: "#12181C"
};

const Green = {
    p10: "#CFFFE0",
    p20: "#D6FFE5",
    p30: "#86EFAC",
    p40: "#44E494",
    p50: "#1DCA73",
    p60: "#17A25C",
    p70: "#15804A",
    p80: "#74ad00"
};

const Purple = {
    p5: "#F9F5FF",
    p10: "#F5EFFF",
    p20: "#EFE3FF",
    p30: "#D3C5FC",
    p40: "#A080FF",
    p50: "#754CFF",
    p60: "#5A34D9",
    p70: "#754cff66"
};

const Yellow = {
    p1: "#FFF9E2",
    p2: "#FFE899",
    p3: "#FFBC00",
    p4: "#FF8E1C",
    p5: "#9D4F00",
    p6: "#E5801A",
    p7: "#FFEDB3"
};

const Red = {
    p1: "#FFEBE6",
    p2: "#FFBDAD",
    p3: "#FF7452",
    p4: "#D92E0D",
    p5: "#BF2600",
    // new color added as per figma
    p6: "#FFCEC2"
};

const ColorPalette = {
    green: Green,
    neutral: Neutral,
    purple: Purple,
    yellow: Yellow,
    red: Red,
    white: "#ffffff",
    Blue: "#ACECD1",
    Red: "#FF9980",
    Yellow: "#FFD033",
    Purple: "#FDE5DF",
    LightBlue: "#BCF0F8",
    Orange: "#FFE380",
    DarkBlue: "#B3D4FF",
    Green: "#79F2C0",
    Grey: "#87929D",
    DarkGrey: "#DED9F8",
    OrangeDark: "#FFBA69",
    Black: "#000000",
    lightGrey: "#E5E5E5",
    lightGreen: "#F6FFEF",
    lightBlue: "#EEFFFD",
    lightPurple: "#F1F5FF",
    veryLightPurple: "#F8F8FF",
    veryLightGrey: "#F4F8FC",
    mediumPurple: "#816AF7",
    ChartOrange: "#FEB25F",
    ChartBlue: "#7C6BFF",
    ChartAqua: "#65ECEC",
    ChartYellow: "#FFE899",
    ChartMagenta: "#FF4CB4",
    ChartGray: "#252D33",
    ChartPink: "#D26AF7",
    navyBlue: "#B3D4FF",
    mattRed: "#FF9980",
    LineChartGrid: "#E9EBED",
    CanvasGrid: "#46516940",
    CharcoalBlue: "#212e37",
    DarkCanvasGrey: "#2A3642",
    DeepIndigo: "#12161f"
};

export const TextTokens = {
    TextOpaque: Neutral.p100,
    TextPrimary: Neutral.p90,
    TextSecondary: Neutral.p80,
    TextTertiary: Neutral.p70,
    TextFade: Neutral.p60,
    TextInverse: ColorPalette.white,
    TextAccent: Purple.p50
};

const BorderTokens = {
    BorderDefault: Neutral.p20,
    BorderMedium: Neutral.p30,
    BorderStrong: Neutral.p40,
    BorderAccent: Purple.p50,
    BorderActive: Neutral.p90
};

const IconTokens = {
    IconOpaque: Neutral.p90,
    IconDefault: Neutral.p80,
    IconSecondary: Neutral.p70,
    IconFade: Neutral.p50,
    IconAccent: Purple.p50
};

const BackgroundTokens = {
    TransparentWhite: "rgba(255, 255, 255, 0.6)",
    ScreenOverlay: "rgba(154, 168, 195, 0.2)"
};

const BarGraphTokens = {
    Grays: {
        breakdown1: [Neutral.p60],
        breakdown2: [Neutral.p70, Neutral.p40],
        breakdown3: [Neutral.p80, Neutral.p60, Neutral.p40],
        breakdown4: [Neutral.p80, Neutral.p60, Neutral.p50, Neutral.p40],
        breakdown5: [
            Neutral.p80,
            Neutral.p70,
            Neutral.p60,
            Neutral.p50,
            Neutral.p40
        ],
        breakdown6: [
            Neutral.p90,
            Neutral.p80,
            Neutral.p70,
            Neutral.p60,
            Neutral.p50,
            Neutral.p40
        ]
    },
    Purple: {
        breakdown1: [Purple.p40],
        breakdown2: [Purple.p40, Purple.p30],
        breakdown3: [Purple.p40, Purple.p30, Purple.p50],
        breakdown4: [Purple.p40, Purple.p30, Purple.p50, Purple.p20],
        breakdown5: [
            Purple.p40,
            Purple.p30,
            Purple.p50,
            Purple.p20,
            Purple.p60
        ],
        breakdown6: [
            Purple.p40,
            Purple.p30,
            Purple.p50,
            Purple.p20,
            Purple.p60,
            Purple.p10
        ]
    },
    Green: {
        breakdown1: ["#8DD400"],
        breakdown2: ["#8DD400", "#5A8800"],
        breakdown3: ["#8DD400", "#5A8800", "#E8F6CC"],
        breakdown4: ["#8DD400", "#5A8800", "#E8F6CC", "#496E00"],
        breakdown5: ["#8DD400", "#5A8800", "#E8F6CC", "#496E00", "#C6E980"],
        breakdown6: [
            "#8DD400",
            "#5A8800",
            "#E8F6CC",
            "#496E00",
            "#C6E980",
            "#74AE00"
        ]
    }
};

const DonutColorTokens = [
    Green.p50,
    ColorPalette.ChartPink,
    Yellow.p3,
    Purple.p40,
    Neutral.p60,
    Green.p40,
    Yellow.p2,
    Purple.p20,
    Neutral.p20,
    Red.p2
];

const LineGraphTokens = [Neutral.p50, "#BDEE5D", Purple.p50];

export const ColorTokens = {
    TextTokens,
    BorderTokens,
    IconTokens,
    BarGraphTokens,
    DonutColorTokens,
    LineGraphTokens,
    BackgroundTokens
};

export default ColorPalette;
