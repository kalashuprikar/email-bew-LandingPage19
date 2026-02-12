import React from "react";
import { HeaderBlock } from "../types";
import { Upload } from "lucide-react";

interface HeaderBlockComponentProps {
  block: HeaderBlock;
  isSelected: boolean;
  onLogoChange: (src: string) => void;
}

export const HeaderBlockComponent: React.FC<HeaderBlockComponentProps> = ({
  block,
  isSelected,
  onLogoChange,
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (warn if > 1MB)
      if (file.size > 1024 * 1024) {
        console.warn(
          "⚠️ Large image detected! File size: " +
            (file.size / 1024 / 1024).toFixed(2) +
            "MB. Consider using a smaller image to avoid storage issues.",
        );
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onLogoChange(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`transition-all ${
        isSelected ? "border-2 border-dashed border-valasys-orange" : ""
      }`}
      style={{
        backgroundColor: block.backgroundColor,
        padding: `${block.padding}px`,
      }}
    >
      {/* Header Main Row - Logo and Links */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "0",
        }}
      >
        {/* Logo */}
        <div style={{ flexShrink: 0, minWidth: "fit-content" }}>
          {block.logo ? (
            <img
              src={block.logo}
              alt={block.logoAlt || "Logo"}
              style={{
                width: `${block.logoWidth}px`,
                height: `${block.logoHeight}px`,
                objectFit: "contain",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: `${block.logoWidth}px`,
                height: `${block.logoHeight}px`,
                border: "2px dashed #d0d0d0",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                cursor: "pointer",
                backgroundColor: "#f9f9f9",
              }}
            >
              <label style={{ cursor: "pointer", textAlign: "center" }}>
                <Upload className="w-4 h-4 text-gray-400 mb-1 mx-auto" />
                <p className="text-xs text-gray-500">Logo Image</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          )}
        </div>

        {/* Links */}
        <div style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          justifyContent: "flex-end",
          flex: 1,
          marginLeft: "auto",
          paddingLeft: "24px",
        }}>
          {block.links.length > 0 ? (
            block.links.map((link, index) => (
              <React.Fragment key={link.id}>
                <a
                  href={link.url}
                  style={{
                    fontSize: `${block.linksFontSize}px`,
                    color: block.linksFontColor,
                    textDecoration: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {link.text}
                </a>
                {index < block.links.length - 1 && (
                  <span style={{ color: block.linksFontColor }}>|</span>
                )}
              </React.Fragment>
            ))
          ) : (
            <span
              style={{
                fontSize: `${block.linksFontSize}px`,
                color: block.linksFontColor,
              }}
            >
              No links
            </span>
          )}
        </div>
      </div>

      {/* Company Name - Below Logo and Links */}
      {block.companyName && (
        <div style={{ textAlign: block.alignment as any, marginTop: "12px" }}>
          <span
            style={{
              fontSize: `${block.companyFontSize}px`,
              color: block.companyFontColor,
              fontWeight: block.companyFontWeight,
              display: "block",
            }}
          >
            {block.companyName}
          </span>
        </div>
      )}
    </div>
  );
};
