import { Zap, DollarSign, TrendingUp } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import { usePathname } from "next/navigation";

function ProgramFeatures() {
  const featureCategories = [
    {
      category: "Analytics",
      categoryColor: "bg-[#4ec48f]",
      title: "Advanced Analytics",
      subtitle: "Real-time engagement metrics",
      challenge:
        "Healthcare providers struggle to measure patient engagement and video effectiveness across multiple touchpoints and campaigns.",
      solution:
        "Real-time engagement metrics, completion rates, and patient interaction insights with comprehensive dashboard reporting.",
      metrics: [
        { value: "92%", label: "Satisfaction", color: "text-green-600" },
        { value: "+45%", label: "Engagement", color: "text-green-600" },
        { value: "+28%", label: "Retention", color: "text-green-600" },
      ],
    },
    {
      category: "Workflow",
      categoryColor: "bg-purple-600",
      title: "Approval Workflow",
      subtitle: "Medical content validation",
      challenge:
        "Complex medical content requires multi-tier review processes and compliance validation to meet healthcare regulations.",
      solution:
        "Multi-tier medical content review and compliance validation system with automated approval workflows and audit trails.",
      metrics: [
        { value: "78%", label: "Time Saved", color: "text-green-600" },
        { value: "+12%", label: "Compliance", color: "text-green-600" },
        { value: "-65%", label: "Review Time", color: "text-red-600" },
      ],
    },
    {
      category: "Engagement",
      categoryColor: "bg-emerald-600",
      title: "Smart Callbacks",
      subtitle: "Automated patient follow-up",
      challenge:
        "Manual follow-up scheduling leads to missed appointments and reduced patient engagement in care protocols.",
      solution:
        "Automated follow-up scheduling based on patient engagement and care protocols with intelligent timing optimization.",
      metrics: [
        { value: "85%", label: "Show Rate", color: "text-green-600" },
        { value: "+33%", label: "Follow-ups", color: "text-green-600" },
        { value: "+19%", label: "Outcomes", color: "text-green-600" },
      ],
    },
    {
      category: "Security",
      categoryColor: "bg-orange-600",
      title: "Enterprise Security",
      subtitle: "Healthcare data protection",
      challenge:
        "Healthcare organizations require zero-trust architecture and comprehensive data protection to maintain HIPAA compliance.",
      solution:
        "Zero-trust architecture and healthcare data protection with end-to-end encryption and compliance monitoring.",
      metrics: [
        { value: "100%", label: "Compliance", color: "text-green-600" },
        { value: "+99%", label: "Uptime", color: "text-green-600" },
        { value: "0", label: "Breaches", color: "text-green-600" },
      ],
    },
  ];

  const route = usePathname();

  const performanceMetrics = [
    {
      value: "78%",
      label: "Engagement Increase",
      icon: TrendingUp,
        textColor: "text-[#4ec48f]",
  bgColor: "bg-[#4ec48f]/10",
    },
    {
      value: "90%",
      label: "Cost Reduction",
      icon: DollarSign,
      textColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      value: "$0.50",
      label: "Video Cost Starting From",
      icon: Zap,
      textColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      {route === "/" && (
        <>
          <SectionHeader>
            <h2 className="text-balance text-center text-3xl font-medium tracking-tighter md:text-4xl">
              Program Features
            </h2>
            <p className="text-balance text-center font-medium text-foreground/60 mt-2">
              Enterprise healthcare video capabilities
            </p>
          </SectionHeader>
          {/* Performance Metrics Overview */}
          <div className="mb-16">
            <div className="grid md:grid-cols-3 gap-6">
              {performanceMetrics.map((metric, index) => (
                <div
                  key={index}
                  className={`text-center p-6 border rounded-xl border-gray-200 ${metric.bgColor} hover:scale-105 shadow-md transition-all`}
                >
                  <div className={`py-6`}>
                    <div
                      className={`flex items-center justify-center rounded-lg ${metric.textColor}`}
                    >
                      <div
                        className={`text-3xl font-bold mb-2 flex justify-center items-center gap-3`}
                      >
                        <metric.icon
                          className={`w-8 h-8 ${metric.textColor}`}
                        />
                        {metric.value}
                      </div>
                    </div>
                    <div className="text-foreground/70 text-base font-medium">
                      {metric.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Feature Categories */}
      <div className="grid lg:grid-cols-2 gap-8">
        {featureCategories.map((feature, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4 pt-6 md:p-8 md:pt-8">
              {/* Category Badge */}
              <div className="mb-6">
                <span
                  className={`inline-block px-4 py-2 rounded-full text-white text-sm font-medium bg-secondary`}
                >
                  {feature.category}
                </span>
              </div>

              {/* Title and Subtitle */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 font-medium">{feature.subtitle}</p>
              </div>

              {/* Challenge Section */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-1 h-6 bg-red-500 mr-3"></div>
                  <h4 className="text-sm font-bold text-red-600 uppercase tracking-wide">
                    Challenge
                  </h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pl-4">
                  {feature.challenge}
                </p>
              </div>

              {/* Solution Section */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-1 h-6 bg-gray-800 mr-3"></div>
                  <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                    Solution
                  </h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pl-4">
                  {feature.solution}
                </p>
              </div>

              {/* Impact Section */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-1 h-6 bg-green-500 mr-3"></div>
                  <h4 className="text-sm font-bold text-green-600 uppercase tracking-wide">
                    Impact
                  </h4>
                </div>
                <div className="grid grid-cols-3 gap-4 pl-4">
                  {feature.metrics.map((metric, metricIndex) => (
                    <div
                      key={metricIndex}
                      className="bg-green-50 rounded-lg p-4 text-center"
                    >
                      <div
                        className={`text-base md:text-xl font-bold mb-1 ${metric.color}`}
                      >
                        {metric.value}
                      </div>
                      <div className="text-gray-600 text-xs font-medium">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgramFeatures;
