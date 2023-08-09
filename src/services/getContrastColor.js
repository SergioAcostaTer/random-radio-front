export default function getContrastColor(background) {
    // Remove the "#" symbol if present
    if (background.charAt(0) === "#") {
        background = background.slice(1);
    }

    // Convert the hexadecimal color to RGB components
    const r = parseInt(background.substr(0, 2), 16);
    const g = parseInt(background.substr(2, 2), 16);
    const b = parseInt(background.substr(4, 2), 16);

    // Calculate relative luminance using the formula for sRGB colors
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    // Determine whether to use white or black text based on luminance
    return luminance > 0.5 ? ["#000000", "#ffffff"] : ["#ffffff", "#000000"];
}