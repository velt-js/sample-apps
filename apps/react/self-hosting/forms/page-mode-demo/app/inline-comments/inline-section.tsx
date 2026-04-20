import { useCommentEventCallback, VeltInlineCommentsSection } from "@veltdev/react";
import { useEffect } from "react";

const InlineSection = () => {
    const commentAnnotationEventCallbackData = useCommentEventCallback('addCommentAnnotation');
    useEffect(() => {
        if (commentAnnotationEventCallbackData) {
            // Handle comment action callback event response
            console.log('commentAnnotationEventCallbackData: ', commentAnnotationEventCallbackData);
        }
    }, [commentAnnotationEventCallbackData]);

    const commentEventCallbackData = useCommentEventCallback('addComment');
    useEffect(() => {
        if (commentEventCallbackData) {
            // Handle comment action callback event response
            console.log('commentEventCallbackData: ', commentEventCallbackData);
        }
    }, [commentEventCallbackData]);
    return (
        <div className="min-h-screen bg-[#F8FAFF] p-8">
                <div className="max-w-3xl mx-auto">
                    {/* Policy Card */}
                    <section
                        id="policy-section"
                        className="bg-white rounded-xl shadow-sm overflow-hidden"
                        style={{
                            boxShadow: "0px 2px 4px rgba(70, 81, 105, 0.08), 0px 1px 1px rgba(92, 108, 138, 0.12)",
                        }}
                    >
                        {/* Policy Content */}
                        <div className="p-8">
                            {/* Title */}
                            <h1
                                className="text-2xl font-semibold mb-4"
                                style={{
                                    fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
                                    color: "#172026",
                                }}
                            >
                                Precise Location shared to Sentry
                            </h1>

                            {/* Policy Description */}
                            <p
                                className="text-base mb-8"
                                style={{
                                    fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
                                    color: "#5A34D9",
                                }}
                            >
                                Policy to restrict sensitive information being shared with Third Parties
                            </p>

                            {/* Suggested Fix Section */}
                            <div className="mb-6">
                                <h2
                                    className="text-sm font-semibold mb-2"
                                    style={{
                                        fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
                                        color: "#172026",
                                    }}
                                >
                                    Suggested Fix
                                </h2>
                                <p
                                    className="text-sm"
                                    style={{
                                        fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
                                        color: "#5A34D9",
                                    }}
                                >
                                    Ensure that sharing Precise Location with Sentry is in compliance with your Privacy Policy.
                                </p>
                            </div>

                            {/* Guidance Section */}
                            <div className="mb-6">
                                <h2
                                    className="text-sm font-semibold mb-2"
                                    style={{
                                        fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
                                        color: "#172026",
                                    }}
                                >
                                    Guidance
                                </h2>
                                <p
                                    className="text-sm"
                                    style={{
                                        fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
                                        color: "#5A34D9",
                                    }}
                                >
                                    No third-party cookies should be dropped. Review and remove the third-party cookies flagged by the alert.
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-[#EDF0F8]" />

                        {/* Comments Section */}
                        <div className="p-8">
                            <h2
                                className="text-base font-semibold mb-4"
                                style={{
                                    fontFamily: "'TT Interphases Pro Variable', Inter, system-ui, sans-serif",
                                    color: "#172026",
                                }}
                            >
                                Comments
                            </h2>

                            {/* Velt Inline Comments Section */}
                            <VeltInlineCommentsSection
                                targetElementId="policy-section"
                                shadowDom={false}
                                composerPosition="top"
                                composerPlaceholder="Write a comment..."
                                replyPlaceholder="Write a reply..."
                                fullExpanded={true}
                            />
                        </div>
                    </section>
                </div>
            </div>
    );
};

export default InlineSection;