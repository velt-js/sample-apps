"use client";

import { useState } from "react";
import {
  IconMenu2,
  IconChevronLeftPipe,
  IconChevronRightPipe,
  IconFolder,
  IconSpeakerphone,
  IconCurrencyDollar,
  IconFileAnalytics,
  IconSettings,
} from "@tabler/icons-react";
import { useSidebar } from "./SidebarContext";

export default function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    FY2023: false,
    FY2024: true,
    FY2025: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      {/* Expand Button - shown when sidebar is collapsed */}
      {isCollapsed && (
        <div
          className="fixed left-4 top-4 z-50 cursor-pointer flex items-center justify-center"
          onClick={toggleSidebar}
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "rgb(14, 14, 14)",
            borderRadius: "8px",
          }}
        >
          <IconChevronRightPipe
            size={20}
            color="rgb(255, 255, 255)"
            stroke={1}
          />
        </div>
      )}

      <aside
        className="flex flex-col justify-between transition-all duration-300"
        style={{
          width: isCollapsed ? "0px" : "251px",
          height: "calc(100vh - 32px)",
          backgroundColor: "rgb(14, 14, 14)",
          borderRadius: "12px",
          margin: "16px",
          marginRight: "8px",
          overflow: "hidden",
          opacity: isCollapsed ? 0 : 1,
        }}
      >
        {/* Top Section */}
        <div className="flex flex-col">
          {/* Header */}
          <div
            className="flex flex-row justify-between items-center"
            style={{
              paddingTop: "12px",
              paddingRight: "12px",
              paddingBottom: "12px",
              paddingLeft: "16px",
              gap: "45px",
              height: "48px",
            }}
          >
            {/* Logo and Workspace Name */}
            <div
              className="flex flex-row items-center"
              style={{
                gap: "8px",
              }}
            >
              <IconMenu2 size={16} color="rgb(255, 255, 255)" stroke={1} />
              <span
                style={{
                  color: "rgb(255, 255, 255)",
                  fontFamily: "Urbanist, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "14px",
                }}
              >
                Bingo's Workspace
              </span>
            </div>

            {/* Collapse Button */}
            <div
              className="flex flex-row items-center cursor-pointer"
              onClick={toggleSidebar}
              style={{
                padding: "4px",
                width: "24px",
                height: "24px",
                gap: "10px",
              }}
            >
              <IconChevronLeftPipe
                size={16}
                color="rgb(255, 255, 255)"
                stroke={1}
              />
            </div>
          </div>

          {/* Navigation Section */}
          <div
            className="flex flex-col items-start flex-1 overflow-auto"
            style={{
              padding: "8px",
              gap: "16px",
            }}
          >
            <div
              className="flex flex-col items-start"
              style={{
                width: "235px",
                gap: "4px",
              }}
            >
            {/* Starred Label */}
            <div
              className="flex flex-row items-start"
              style={{
                borderRadius: "32px",
                padding: "6px 8px",
                gap: "4px",
                height: "24px",
              }}
            >
              <span
                style={{
                  color: "rgb(163, 163, 163)",
                  fontFamily: "Urbanist, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  lineHeight: "12px",
                }}
              >
                Starred
              </span>
            </div>

            {/* FY2023 */}
            <div
              className="flex flex-col items-start"
              style={{
                gap: "2px",
              }}
            >
              <div
                className="flex flex-row items-center cursor-pointer"
                onClick={() => toggleSection("FY2023")}
                style={{
                  borderRadius: "8px",
                  padding: "8px",
                  gap: "12px",
                  width: "235px",
                  height: "32px",
                }}
              >
                <IconFolder size={14} color="rgb(255, 255, 255)" stroke={1} />
                <span
                  style={{
                    color: "rgb(255, 255, 255)",
                    fontFamily: "Urbanist, sans-serif",
                    fontSize: "15px",
                    fontWeight: 400,
                    lineHeight: "15px",
                    width: "193px",
                  }}
                >
                  FY2023
                </span>
              </div>
            </div>

            {/* FY2024 */}
            <div
              className="flex flex-col items-start"
              style={{
                gap: "2px",
              }}
            >
              <div
                className="flex flex-row items-center cursor-pointer"
                onClick={() => toggleSection("FY2024")}
                style={{
                  borderRadius: "8px",
                  padding: "8px",
                  gap: "12px",
                  width: "235px",
                  height: "32px",
                }}
              >
                <IconFolder size={14} color="rgb(255, 255, 255)" stroke={1} />
                <span
                  style={{
                    color: "rgb(255, 255, 255)",
                    fontFamily: "Urbanist, sans-serif",
                    fontSize: "15px",
                    fontWeight: 400,
                    lineHeight: "15px",
                    width: "193px",
                  }}
                >
                  FY2024
                </span>
              </div>

              {/* FY2024 Nested Items */}
              {expandedSections.FY2024 && (
                <div
                  className="flex flex-col items-start justify-center"
                  style={{
                    borderRadius: "8px",
                    gap: "4px",
                    padding: "8px 0 8px 24px",
                    width: "235px",
                  }}
                >
                  <div
                    className="flex flex-row items-center"
                    style={{
                      borderRadius: "8px",
                      padding: "8px",
                      gap: "12px",
                      width: "211px",
                      height: "32px",
                    }}
                  >
                    <IconSpeakerphone
                      size={16}
                      color="rgb(255, 255, 255)"
                      stroke={1}
                    />
                    <span
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontFamily: "Urbanist, sans-serif",
                        fontSize: "15px",
                        fontWeight: 400,
                        lineHeight: "15px",
                        width: "167px",
                      }}
                    >
                      Marketing Spend
                    </span>
                  </div>

                  <div
                    className="flex flex-row items-center"
                    style={{
                      borderRadius: "8px",
                      padding: "8px",
                      gap: "12px",
                      width: "211px",
                      height: "32px",
                    }}
                  >
                    <IconCurrencyDollar
                      size={16}
                      color="rgb(255, 255, 255)"
                      stroke={1}
                    />
                    <span
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontFamily: "Urbanist, sans-serif",
                        fontSize: "15px",
                        fontWeight: 400,
                        lineHeight: "15px",
                        width: "167px",
                      }}
                    >
                      Salaries
                    </span>
                  </div>

                  <div
                    className="flex flex-row items-center"
                    style={{
                      borderRadius: "8px",
                      padding: "8px",
                      gap: "12px",
                      width: "211px",
                      height: "32px",
                    }}
                  >
                    <IconFileAnalytics
                      size={16}
                      color="rgb(255, 255, 255)"
                      stroke={1}
                    />
                    <span
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontFamily: "Urbanist, sans-serif",
                        fontSize: "15px",
                        fontWeight: 400,
                        lineHeight: "15px",
                        width: "167px",
                      }}
                    >
                      Misc.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* FY2025 */}
            <div
              className="flex flex-col items-start"
              style={{
                gap: "2px",
              }}
            >
              <div
                className="flex flex-row items-center cursor-pointer"
                onClick={() => toggleSection("FY2025")}
                style={{
                  borderRadius: "8px",
                  padding: "8px",
                  gap: "12px",
                  width: "235px",
                  height: "32px",
                }}
              >
                <IconFolder size={14} color="rgb(255, 255, 255)" stroke={1} />
                <span
                  style={{
                    color: "rgb(255, 255, 255)",
                    fontFamily: "Urbanist, sans-serif",
                    fontSize: "15px",
                    fontWeight: 400,
                    lineHeight: "15px",
                    width: "193px",
                  }}
                >
                  FY2025
                </span>
              </div>

              {/* FY2025 Nested Items */}
              {expandedSections.FY2025 && (
                <div
                  className="flex flex-col items-start justify-center"
                  style={{
                    borderRadius: "8px",
                    gap: "4px",
                    padding: "8px 0 8px 24px",
                    width: "235px",
                  }}
                >
                  {/* Marketing Spend - Selected State */}
                  <div
                    className="flex flex-row items-center"
                    style={{
                      backgroundColor: "rgb(35, 35, 35)",
                      borderRadius: "8px",
                      padding: "8px",
                      gap: "12px",
                      width: "211px",
                      height: "32px",
                    }}
                  >
                    <IconSpeakerphone
                      size={16}
                      color="rgb(255, 205, 46)"
                      stroke={1}
                    />
                    <span
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontFamily: "Urbanist, sans-serif",
                        fontSize: "15px",
                        fontWeight: 400,
                        lineHeight: "15px",
                        width: "167px",
                      }}
                    >
                      Marketing Spend
                    </span>
                  </div>

                  <div
                    className="flex flex-row items-center"
                    style={{
                      borderRadius: "8px",
                      padding: "8px",
                      gap: "12px",
                      width: "211px",
                      height: "32px",
                    }}
                  >
                    <IconCurrencyDollar
                      size={16}
                      color="rgb(255, 255, 255)"
                      stroke={1}
                    />
                    <span
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontFamily: "Urbanist, sans-serif",
                        fontSize: "15px",
                        fontWeight: 400,
                        lineHeight: "15px",
                        width: "167px",
                      }}
                    >
                      Salaries
                    </span>
                  </div>

                  <div
                    className="flex flex-row items-center"
                    style={{
                      borderRadius: "8px",
                      padding: "8px",
                      gap: "12px",
                      width: "211px",
                      height: "32px",
                    }}
                  >
                    <IconFileAnalytics
                      size={16}
                      color="rgb(255, 255, 255)"
                      stroke={1}
                    />
                    <span
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontFamily: "Urbanist, sans-serif",
                        fontSize: "15px",
                        fontWeight: 400,
                        lineHeight: "15px",
                        width: "167px",
                      }}
                    >
                      Misc.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>

        {/* Bottom Section - Settings */}
        <div
          className="flex flex-row items-center"
          style={{
            padding: "16px",
            gap: "8px",
          }}
        >
          <IconSettings size={16} color="rgb(255, 255, 255)" stroke={1} />
          <span
            style={{
              color: "rgb(255, 255, 255)",
              fontFamily: "Urbanist, sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "17px",
            }}
          >
            Settings
          </span>
        </div>
      </aside>
    </>
  );
}
