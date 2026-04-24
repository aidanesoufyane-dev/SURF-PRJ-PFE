import Link from "next/link";

export default function HomePage() {
	return (
		<main className="min-h-screen flex items-center justify-center px-6" style={{ background: "#F5ECD7" }}>
			<section className="max-w-xl text-center">
				<h1
					className="text-4xl font-bold mb-4"
					style={{ fontFamily: "'Playfair Display', serif", color: "#0A0A0A" }}
				>
					Welcome to SurfBook
				</h1>
				<p className="text-base mb-8" style={{ fontFamily: "'DM Sans', sans-serif", color: "#4B5563" }}>
					Manage bookings, rooms, payments, and surf sessions from one place.
				</p>
				<div className="flex items-center justify-center gap-3">
					<Link href="/login" className="btn-primary">
						Log in
					</Link>
					<Link href="/register" className="btn-secondary">
						Create account
					</Link>
				</div>
			</section>
		</main>
	);
}
