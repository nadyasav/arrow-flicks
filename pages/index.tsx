import { useRouter } from "next/navigation";

export default function IndexPage() {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    router.push('/movies')
  }
}
