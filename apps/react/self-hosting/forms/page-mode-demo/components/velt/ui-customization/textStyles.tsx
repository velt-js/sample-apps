import { css } from "styled-components";
import colors from "./colors";

const generateStyle = (
    fontSize: number,
    fontWeight: number,
    color: string,
    fontStyle: string,
    lineHeight: number
): any => {
    return css`
        font-size: ${fontSize}px;
        font-weight: ${fontWeight};
        color: ${color};
        font-style: ${fontStyle};
        line-height: ${lineHeight}px;
    `;
};

const HeadlineH100 = {
    HeadlineH100Regular: css`
        ${generateStyle(36, 400, colors.neutral.p90, "normal", 44)}
    `,
    HeadlineH100Semibold: css`
        ${generateStyle(36, 500, colors.neutral.p90, "normal", 44)}
    `
};

const HeadlineH200 = {
    HeadlineH200Regular: css`
        ${generateStyle(24, 400, colors.neutral.p90, "normal", 32)}
    `,
    HeadlineH200Semibold: css`
        ${generateStyle(24, 500, colors.neutral.p90, "normal", 32)}
    `
};

const HeadlineH300 = {
    HeadlineH300Regular: css`
        ${generateStyle(20, 400, colors.neutral.p90, "normal", 32)}
    `,
    HeadlineH300Semibold: css`
        ${generateStyle(20, 500, colors.neutral.p90, "normal", 28)}
    `
};

const HeadlineH400 = {
    HeadlineH400Regular: css`
        ${generateStyle(18, 400, colors.neutral.p90, "normal", 24)}
    `,
    HeadlineH400Semibold: css`
        ${generateStyle(18, 500, colors.neutral.p90, "normal", 24)}
    `
};

const HeadlineH500 = {
    HeadlineH500Regular: css`
        ${generateStyle(16, 400, colors.neutral.p90, "normal", 24)}
    `,
    HeadlineH500Medium: css`
        ${generateStyle(16, 490, colors.neutral.p90, "normal", 24)}
    `,
    HeadlineH500Semibold: css`
        ${generateStyle(16, 500, colors.neutral.p90, "normal", 24)}
    `
};

const HeadlineH600 = {
    HeadlineH600Regular: css`
        ${generateStyle(14, 400, colors.neutral.p90, "normal", 18)}
    `,
    HeadlineH600bold: css`
        ${generateStyle(14, 600, colors.neutral.p90, "normal", 18)}
    `
};

const TextT100 = {
    TextT100Regular: css`
        ${generateStyle(14, 400, colors.neutral.p90, "normal", 18)}
    `,
    TextT100Medium: css`
        ${generateStyle(14, 492, colors.neutral.p90, "normal", 18)}
    `,
    TextT100Semibold: css`
        ${generateStyle(14, 500, colors.neutral.p90, "normal", 18)}
    `,
    TextT100Link: css`
        ${generateStyle(14, 500, colors.neutral.p90, "normal", 18)}
        text-decoration: underline;
    `
};

const TextT200 = {
    TextT200Regular: css`
        ${generateStyle(13, 400, colors.neutral.p90, "normal", 18)}
    `,
    T200Medium: css`
        ${generateStyle(13, 492, colors.neutral.p90, "normal", 18)}
    `,
    TextT200Semibold: css`
        ${generateStyle(13, 500, colors.neutral.p90, "normal", 18)}
    `,
    TextT200Link: css`
        ${generateStyle(13, 500, colors.neutral.p90, "normal", 18)}
        text-decoration: underline !important;
    `,
    TextT200RegularPurple: css`
        ${generateStyle(13, 400, colors.purple.p50, "normal", 18)}
    `
};

const TextT300 = {
    TextT300Regular: css`
        ${generateStyle(12, 400, colors.neutral.p90, "normal", 16)}
    `,
    TextT300Semibold: css`
        ${generateStyle(12, 500, colors.neutral.p90, "normal", 16)}
    `,
    TextT300Link: css`
        ${generateStyle(12, 500, colors.neutral.p90, "normal", 16)}
        text-decoration: underline;
    `
};

const CaptionC100 = {
    CaptionC100Regular: css`
        ${generateStyle(11, 400, colors.neutral.p90, "normal", 16)}
        letter-spacing: 0.04em;
    `,

    CaptionC100Semibold: css`
        ${generateStyle(11, 500, colors.neutral.p90, "normal", 16)}
        letter-spacing: 0.04em;
    `
};

const TextStyles = {
    ...HeadlineH100,
    ...HeadlineH200,
    ...HeadlineH300,
    ...HeadlineH400,
    ...HeadlineH500,
    ...HeadlineH600,
    ...TextT100,
    ...TextT200,
    ...TextT300,
    ...CaptionC100,
    ParagraphP100: css`
        ${generateStyle(16, 400, colors.neutral.p90, "normal", 24)}
    `,
    ParagraphP200: css`
        ${generateStyle(14, 400, colors.neutral.p90, "normal", 22)}
    `,
    ParagraphP200SemiBold: css`
        ${generateStyle(14, 500, colors.neutral.p90, "normal", 22)}
    `,
    ParagraphP300: css`
        ${generateStyle(13, 400, colors.neutral.p70, "normal", 20)}
    `,
    ParagraphP300Link: css`
        ${generateStyle(13, 500, colors.neutral.p90, "normal", 20)};
        text-decoration: underline !important;
    `,
    LightHeadlineH400Regular: css`
        ${generateStyle(18, 400, colors.neutral.p60, "normal", 24)}
    `,
    LightTextT300Regular: css`
        ${generateStyle(12, 400, colors.neutral.p60, "normal", 16)}
    `,
    SmallText400Regular: css`
        ${generateStyle(10, 400, colors.white, "normal", 8)}
    `
};

export default TextStyles;
