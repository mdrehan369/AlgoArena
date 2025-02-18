export default async function Problem({ params }: { params: Promise<{ problemNo: string }> }) {
    const { problemNo } = await params
    return (
        problemNo
    )
}