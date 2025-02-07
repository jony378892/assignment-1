function SubscriptionBanner() {
  return (
    <div className="bg-blue-500 text-white py-10 mb-10 rounded-lg">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6">Get the latest updates and offers.</p>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-md text-black w-2/3 lg:w-1/2 bg-white"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubscriptionBanner;
