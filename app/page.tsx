"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Camera, CheckCircle, Truck, Gift, Star, Shield, Package } from "lucide-react"

interface JerseyData {
  brand: string
  team: string
  player: string
  size: string
  condition: string
  season: string
  description: string
  photos: { [key: string]: File | null }
}

const brandRequirements = {
  adidas: [
    { key: "front", label: "Front View", description: "Full front view of the jersey" },
    { key: "back", label: "Back View", description: "Full back view with name/number" },
    { key: "logo", label: "Adidas Logo", description: "Close-up of the three stripes logo" },
    { key: "tag", label: "Internal Model/Date Tag", description: "Internal model and date label" },
  ],
  nike: [
    { key: "front", label: "Front View", description: "Full front view of the jersey" },
    { key: "back", label: "Back View", description: "Full back view with name/number" },
    { key: "swoosh", label: "Nike Swoosh", description: "Close-up of the Nike swoosh logo" },
    { key: "teamlogo", label: "Team Logo", description: "Dri-FIT technology label" },
    { key: "internal", label: "Internal Tag", description: "Internal size and authenticity tag" },
  ],
  puma: [
    { key: "front", label: "Front View", description: "Full front view of the jersey" },
    { key: "back", label: "Back View", description: "Full back view with name/number" },
    { key: "teamlogo", label: "Team Logo", description: "Close-up of the Puma cat logo" },
    { key: "label", label: "Internal Tag", description: "Internal care and size label" },
  ],
  other: [
    { key: "front", label: "Front View", description: "Full front view of the jersey" },
    { key: "back", label: "Back View", description: "Full back view with name/number" },
    { key: "cat", label: "Brand Logo", description: "Close-up of the team logo" },
    { key: "label", label: "Internal Tags", description: "Internal Tags" },
  ],
}

export default function JerseyExchangeForm() {
  const [step, setStep] = useState(1)
  const [jerseyData, setJerseyData] = useState<JerseyData>({
    brand: "",
    team: "",
    player: "",
    size: "",
    condition: "",
    season: "",
    description: "",
    photos: {},
  })
  const [deliveryCode, setDeliveryCode] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setJerseyData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = (key: string, file: File | null) => {
    setJerseyData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [key]: file },
    }))
  }

  const generateDeliveryCode = () => {
    const code = `FW-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    setDeliveryCode(code)
    setStep(4)
  }

  const currentRequirements = jerseyData.brand
    ? brandRequirements[jerseyData.brand as keyof typeof brandRequirements] || []
    : []
  const uploadedPhotos = Object.values(jerseyData.photos).filter((photo) => photo !== null).length
  const requiredPhotos = currentRequirements.length

  return (
    <div className="min-h-screen bg-white p-4">
      <div
  className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8"
  style={{ fontFamily: "Arial, sans-serif" }}
>
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 mb-4">Trade your authentic football jerseys for brand coupon codes</p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-green-600" />
              <span className="font-semibold">At least €15 coupon value</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">Under authentication review</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-purple-600" />
              <span className="font-semibold">Free shipping label for some EU countries</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {step} of 4</span>
            <span className="text-sm text-gray-500">{Math.round((step / 4) * 100)}% Complete</span>
          </div>
          <Progress value={(step / 4) * 100} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Jersey Info</span>
            <span>Photos</span>
            <span>Review</span>
            <span>Delivery</span>
          </div>
        </div>

        {/* Step 1: Jersey Information */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Jersey Information
              </CardTitle>
              <CardDescription>
                Tell us about your jersey. We accept authentic jerseys from major brands like Adidas, Nike, Puma and other brands.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand *</Label>
                  <Select value={jerseyData.brand} onValueChange={(value) => handleInputChange("brand", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adidas">
  <div className="flex items-center gap-2">
    <img src="/adidas.png" alt="Adidas" className="w-5 h-5" />
    Adidas
  </div>
</SelectItem>
<SelectItem value="nike">
  <div className="flex items-center gap-2">
    <img src="/nike.webp" alt="Nike" className="w-5 h-5" />
    Nike
  </div>
</SelectItem>
<SelectItem value="puma">
  <div className="flex items-center gap-2">
    <img src="/puma.svg" alt="Puma" className="w-5 h-5" />
    Puma
  </div>
</SelectItem>
                      <SelectItem value="other">
                        <div className="flex items-center gap-2">
                        <img src="/ball.png" alt="Puma" className="w-5 h-5" />
                          Other
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="team">Team/Club *</Label>
                  <Input
                    id="team"
                    placeholder="e.g., Real Madrid, Barcelona, Bayern Munich, Boca Juniors"
                    value={jerseyData.team}
                    onChange={(e) => handleInputChange("team", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="player">Player Name</Label>
                  <Input
                    id="player"
                    placeholder="e.g., Messi, Ronaldo (optional)"
                    value={jerseyData.player}
                    onChange={(e) => handleInputChange("player", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Size *</Label>
                  <Select value={jerseyData.size} onValueChange={(value) => handleInputChange("size", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kids">Kids Size</SelectItem>
                      <SelectItem value="XS">XS</SelectItem>
                      <SelectItem value="S">S</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="XL">XL</SelectItem>
                      <SelectItem value="XXL">XXL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Condition *</Label>
                  <Select value={jerseyData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            New
                          </Badge>
                          Never worn, with tags
                        </div>
                      </SelectItem>
                      <SelectItem value="excellent">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            Excellent
                          </Badge>
                          Worn few times, like new
                        </div>
                      </SelectItem>
                      <SelectItem value="verygood">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            Very Good
                          </Badge>
                          Some wear, no major flaws
                        </div>
                      </SelectItem>
                      <SelectItem value="good">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                            Good
                          </Badge>
                          Visible wear, minor flaws
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="season">Season</Label>
                  <Input
                    id="season"
                    placeholder="e.g., 2023/24, 2022/23"
                    value={jerseyData.season}
                    onChange={(e) => handleInputChange("season", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Additional Description</Label>
                <Textarea
                  id="description"
                  placeholder="Any additional details about the jersey (optional)"
                  value={jerseyData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                onClick={() => setStep(2)}
                className="w-full"
                disabled={!jerseyData.brand || !jerseyData.team || !jerseyData.size || !jerseyData.condition}
              >
                Continue to Photo Upload
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Photo Upload */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-500" />
                Photo Verification - {jerseyData.brand.charAt(0).toUpperCase() + jerseyData.brand.slice(1)}
              </CardTitle>
              <CardDescription>
                Upload clear, well-lit photos of your jersey. We need specific photos to verify authenticity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Photo Requirements:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• High resolution, clear and well-lit photos</li>
                  <li>• Show the entire jersey laid flat on a clean surface</li>
                  <li>• Close-up shots should be sharp and readable</li>
                  <li>• All photos are required for verification</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentRequirements.map((req) => (
                  <div
                    key={req.key}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors"
                  >
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        {jerseyData.photos[req.key] ? (
                          <CheckCircle className="h-8 w-8 text-green-500" />
                        ) : (
                          <Upload className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-900">{req.label}</h4>
                      <p className="text-sm text-gray-600 mb-3">{req.description}</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(req.key, e.target.files?.[0] || null)}
                        className="hidden"
                        id={`photo-${req.key}`}
                      />
                      <label
                        htmlFor={`photo-${req.key}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer text-sm"
                      >
                        <Upload className="h-4 w-4" />
                        {jerseyData.photos[req.key] ? "Change Photo" : "Upload Photo"}
                      </label>
                      {jerseyData.photos[req.key] && <p className="text-xs text-green-600 mt-1">✓ Photo uploaded</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Upload Progress:</span>
                  <span className="text-sm text-gray-600">
                    {uploadedPhotos} of {requiredPhotos} photos
                  </span>
                </div>
                <Progress value={(uploadedPhotos / requiredPhotos) * 100} className="mt-2" />
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1" disabled={uploadedPhotos < requiredPhotos}>
                  Continue to Review
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Review Your Submission
              </CardTitle>
              <CardDescription>
                Please review your jersey information before submitting for verification.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Jersey Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Brand:</span>
                      <Badge variant="secondary">
                        {jerseyData.brand.charAt(0).toUpperCase() + jerseyData.brand.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Team:</span>
                      <span className="font-medium">{jerseyData.team}</span>
                    </div>
                    {jerseyData.player && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Player:</span>
                        <span className="font-medium">{jerseyData.player}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">{jerseyData.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Condition:</span>
                      <Badge variant="outline">{jerseyData.condition}</Badge>
                    </div>
                    {jerseyData.season && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Season:</span>
                        <span className="font-medium">{jerseyData.season}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Photos Uploaded</h3>
                  <div className="space-y-2">
                    {currentRequirements.map((req) => (
                      <div key={req.key} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{req.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {jerseyData.description && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Additional Notes</h3>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{jerseyData.description}</p>
                </div>
              )}

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">What happens next?</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• We'll generate a free shipping label for you</li>
                  <li>• Our team will verify your jersey's authenticity</li>
                  <li>• You'll receive a coupon code worth at least €15</li>
                  <li>• Verification typically takes 1-2 business days</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back to Photos
                </Button>
                <Button onClick={generateDeliveryCode} className="flex-1">
                  Submit for Verification
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Delivery Code */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-purple-500" />
                Delivery Instructions
              </CardTitle>
              <CardDescription>
                Your submission has been received! Follow these steps to send us your jersey.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="bg-purple-100 p-6 rounded-lg mb-6">
                  <h3 className="font-bold text-xl text-purple-900 mb-2">Your Delivery Code</h3>
                  <div className="bg-white p-4 rounded-lg border-2 border-purple-300">
                    <code className="text-2xl font-mono font-bold text-purple-700">{deliveryCode}</code>
                  </div>
                  <p className="text-sm text-purple-700 mt-2">Keep this code for tracking your submission</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-blue-700">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Package Your Jersey</h4>
                  <p className="text-sm text-gray-600">
                    Carefully fold and package your jersey in a protective bag or box
                  </p>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-green-700">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Print Shipping Label</h4>
                  <p className="text-sm text-gray-600">We'll email you a prepaid shipping label within 24 hours</p>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-purple-700">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Send & Get Coupon</h4>
                  <p className="text-sm text-gray-600">
                    Drop off at any post office and receive your coupon code after verification
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">Important Notes:</h3>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>
                    • Include your delivery code <strong>{deliveryCode}</strong> inside the package
                  </li>
                  <li>• We'll send tracking updates to your email</li>
                  <li>• Contact support if you have any questions</li>
                </ul>
              </div>

              <div className="text-center">
                <Button
                  onClick={() => {
                    setStep(1)
                    setJerseyData({
                      brand: "",
                      team: "",
                      player: "",
                      size: "",
                      condition: "",
                      season: "",
                      description: "",
                      photos: {},
                    })
                    setDeliveryCode("")
                  }}
                  variant="outline"
                >
                  Submit Another Jersey
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
