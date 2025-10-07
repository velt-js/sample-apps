import { SamplePageClient } from "./sample-page-client"
import { getSampleById, SAMPLES } from "@/samples"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return Object.keys(SAMPLES).map(id => ({
    sampleId: id
  }))
}

export default function SamplePage({ params }: { params: { sampleId: string } }) {
  const sample = getSampleById(params.sampleId)

  if (!sample) {
    notFound()
  }

  return <SamplePageClient sample={sample} />
}

