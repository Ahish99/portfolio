#!/bin/bash
# Generate simple PNG icons using ImageMagick or Python

# Create a simple icon with text
python3 << 'PYEOF'
import struct
import zlib

def create_png(width, height, bg_color=(37, 99, 235), text="📋"):
    """Create a simple PNG with background color"""
    # Create raw image data
    raw_data = b''
    for y in range(height):
        raw_data += b'\x00'  # filter byte
        for x in range(width):
            # Create a gradient effect
            r = bg_color[0]
            g = bg_color[1]
            b = bg_color[2]
            raw_data += bytes([r, g, b])
    
    # Compress
    compressed = zlib.compress(raw_data, 9)
    
    def chunk(chunk_type, data):
        chunk_len = struct.pack('>I', len(data))
        chunk_type_bytes = chunk_type.encode('ascii')
        chunk_data = data
        chunk_crc = struct.pack('>I', zlib.crc32(chunk_type_bytes + chunk_data) & 0xffffffff)
        return chunk_len + chunk_type_bytes + chunk_data + chunk_crc
    
    # PNG signature
    signature = b'\x89PNG\r\n\x1a\n'
    
    # IHDR
    ihdr = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    
    # Build PNG
    png = signature + chunk('IHDR', ihdr) + chunk('IDAT', compressed) + chunk('IEND', b'')
    
    return png

# Create 192x192 icon
icon_192 = create_png(192, 192)
with open('icon-192.png', 'wb') as f:
    f.write(icon_192)

# Create 512x512 icon
icon_512 = create_png(512, 512)
with open('icon-512.png', 'wb') as f:
    f.write(icon_512)

print("Icons created: icon-192.png, icon-512.png")
PYEOF
