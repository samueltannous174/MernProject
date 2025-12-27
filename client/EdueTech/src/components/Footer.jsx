export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 border-t border-gray-700">
            <div className="px-8 py-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
                <p>
                    © {new Date().getFullYear()}{" "}
                    <span className="bg-gradient-to-r from-blue-500 to-green-300 bg-clip-text text-transparent font-semibold">
                        EduTech
                    </span>
                    . All rights reserved.
                </p>

                <div className="flex gap-6 mt-4 md:mt-0">
                    <span className="hover:text-blue-400 transition cursor-pointer">About</span>
                    <span className="hover:text-blue-400 transition cursor-pointer">Support</span>
                    <span className="hover:text-blue-400 transition cursor-pointer">Contact</span>
                </div>
            </div>
        </footer>
    );
}