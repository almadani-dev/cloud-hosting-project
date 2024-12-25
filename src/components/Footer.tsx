const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <div className="h-[50px] flex items-center justify-center text-white bg-gray-700 ">
      Copyright {currentYear} Cloud Hosting
    </div>
  );
};

export default Footer;
