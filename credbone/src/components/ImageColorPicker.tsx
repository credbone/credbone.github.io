import React, { useRef, useState, useEffect } from 'react';
import colorsource from "../styles/images/samples/res_44.jpg";

interface ImageColorPickerProps {
  // You can add more props here if needed.
}

const ImageColorPicker: React.FC<ImageColorPickerProps> = () => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isPicking, setIsPicking] = useState<boolean>(false); // Track if mouse/touch is down
  const [pointerPosition, setPointerPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Function to pick color based on coordinates
  const pickColor = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context) {
      const pixel = context.getImageData(x, y, 1, 1).data;
      const rgbColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
      setSelectedColor(rgbColor);
    }
  };

  // Handle mouse movement to get pixel color when mouse/touch is down
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isPicking) return; // Only pick color if mouse/touch is down

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;  // Get horizontal scaling factor
    const scaleY = canvas.height / rect.height; // Get vertical scaling factor

    // Adjust the coordinates based on event type
    const x =
      'touches' in e ? (e as React.TouchEvent).touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y =
      'touches' in e ? (e as React.TouchEvent).touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    // Scale the coordinates
    const scaledX = x * scaleX;
    const scaledY = y * scaleY;

    setPointerPosition({ x, y }); // Set pointer position to mouse coordinates
    pickColor(scaledX, scaledY); // Pick color based on scaled coordinates
  };

  // Start picking color on mouse down or touch start
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsPicking(true);
    handleMouseMove(e); // Pick color immediately on mouse down/touch start
  };

  // Stop picking color on mouse up or touch end
  const handleMouseUp = () => {
    setIsPicking(false);
  };

  // Stop picking color when the mouse/touch leaves the canvas
  const handleMouseLeave = () => {
    setIsPicking(false); // Stop picking when leaving the canvas
  };

  // Handle image loading and draw it on canvas
  const handleImageLoad = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (canvas && img) {
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
      }
    }
  };

  // Optional: Handle window resizing to keep the canvas responsive
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const img = imageRef.current;
      if (canvas && img) {
        const context = canvas.getContext('2d');
        if (context) {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <group data-direction="column" data-gap="10">

        <group data-border="" data-space="10">
          <p>
            Selected Color: <span style={{ color: selectedColor }}>{selectedColor}</span>
          </p>
        </group>


<group>
<canvas
        data-radius="10"
        data-border=""
data-name="color-source"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave} // Stop picking on mouse leave
        onTouchStart={handleMouseDown} // Start picking on touch start
        onTouchEnd={handleMouseUp} // Stop picking on touch end
        onTouchMove={handleMouseMove} // Handle touch move for picking color
        style={{
       
          maxWidth: '100%',
         // cursor: 'crosshair',
        }}
      />
      
      <group
      data-name="color-indicator"
      data-position="absolute"
      data-length="20"
      data-height="20"  
      data-radius="20"
      data-elevation="1"

    style={{
        
          left: `${pointerPosition.x}px`,
          top: `${pointerPosition.y}px`,

          backgroundColor: selectedColor,
          pointerEvents: 'none', // Make sure this div doesn't interfere with mouse events
          border: '2px solid white',
        }}
      />
</group>

      <img
        ref={imageRef}
        src={colorsource}
        alt="Color Picker"
        style={{ display: 'none' }}
        onLoad={handleImageLoad}
      />
    </group>
  );
};

export default ImageColorPicker;
