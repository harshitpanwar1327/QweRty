import { toast } from 'react-toastify'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import CropOriginalIcon from '@mui/icons-material/CropOriginal'
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus'

export const DownloadQR = ({ setOpenDownloadModal, qrPreview, qrName }) => {
  const handleDownloadQr = async (downloadFormat: string) => {
    try {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = qrPreview;

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = (e) => reject(e);
      });

      const width = img.width || 512;
      const height = img.height || 512;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Unable to create canvas context.");

      if (downloadFormat === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
      }

      ctx.drawImage(img, 0, 0, width, height);

      let dataUrl: string;
      if (downloadFormat === "svg") {
        const svgContent = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
            <image href="${qrPreview}" width="${width}" height="${height}" />
          </svg>`;
        dataUrl =
          "data:image/svg+xml;base64," +
          btoa(unescape(encodeURIComponent(svgContent)));
      } else {
        const mimeType =
          downloadFormat === "jpeg" ? "image/jpeg" : "image/png";
        dataUrl = canvas.toDataURL(mimeType, 1.0);
      }

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${qrName || "MyQR"}.${downloadFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      toast.error("Failed to download QR.");
    }
  };

  return (
    <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-[#0000005a] z-10' onClick={()=>setOpenDownloadModal(false)}>
      <div className="w-4/5 md:w-1/2 lg:w-1/3 bg-white rounded-xl shadow-md flex flex-col" onClick={(e)=>e.stopPropagation()}>
        <div className='p-4 flex justify-between items-center border-b border-gray-200'>
          <h4 className='text-lg font-semibold'>Save as...</h4>
          <CloseRoundedIcon className='cursor-pointer' onClick={()=>setOpenDownloadModal(false)}/>
        </div>

        <div className='flex flex-col gap-1 p-4'>
          <div onClick={()=>handleDownloadQr('png')} className="flex items-center gap-2 p-2 border border-gray-200 rounded hover:bg-pink-100 group cursor-pointer">
            <div className='p-2 flex items-center gap-2'>
              <CropOriginalIcon className='group-hover:text-pink-500' />
              <h4 className='font-semibold'>PNG</h4>
            </div>
            <p className='p-2 border-l border-gray-200'>File with transparent background.</p>
          </div>
          
          <div onClick={()=>handleDownloadQr('jpeg')} className="flex items-center gap-2 p-2 border border-gray-200 rounded hover:bg-pink-100 group cursor-pointer">
            <div className='p-2 flex items-center gap-2'>
              <CropOriginalIcon className='group-hover:text-pink-500' />
              <h4 className='font-semibold'>JPEG</h4>
            </div>
            <p className='p-2 border-l border-gray-200'>Standard image file.</p>
          </div>

          <div onClick={()=>handleDownloadQr('svg')} className="flex items-center gap-2 p-2 border border-gray-200 rounded hover:bg-pink-100 group cursor-pointer">
            <div className='p-2 flex items-center gap-2'>
              <FilterCenterFocusIcon className='group-hover:text-pink-500' />
              <h4 className='font-semibold'>SVG</h4>
            </div>
            <p className='p-2 border-l border-gray-200'>Vector File.</p>
          </div>
        </div>
      </div>
    </div>
  )
}