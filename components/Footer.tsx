export default function Footer() {
    return (
        <footer className="bg-green-900 text-white py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold text-green-100">Halधर</h2>
                        <p className="text-green-200 text-sm mt-1">Soil to Success</p>
                    </div>

                    <div className="flex gap-6 text-sm text-green-200">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>

                    <div className="text-sm text-green-300">
                        &copy; {new Date().getFullYear()} Halधर. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
