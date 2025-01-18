import ThemeBot from '../../components/themes/ThemeBot';
import { colorSchemes, themeDescriptions } from '../../utils/themeData';

const ThemeCard = ({ theme, colors, description }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <div className="h-20 flex">
      {colors[0].map((color, index) => (
        <div
          key={index}
          className="flex-1"
          style={{ backgroundColor: color.primary }}
        />
      ))}
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold capitalize mb-2">{theme}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </div>
  </div>
);

const ThemePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Theme Ideas
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Get AI-powered theme suggestions and design inspiration for your perfect event.
        </p>
      </div>

      {/* Theme Examples */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Popular Themes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(themeDescriptions).map(([theme, description]) => (
            <ThemeCard
              key={theme}
              theme={theme}
              colors={[colorSchemes[theme]]}
              description={description}
            />
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="text-2xl mb-2">🎨</div>
          <h3 className="font-semibold mb-2">Color Psychology</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Colors can influence mood and atmosphere. Choose colors that align with
            your event's purpose and desired emotional impact.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="text-2xl mb-2">🌟</div>
          <h3 className="font-semibold mb-2">Seasonal Considerations</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Consider the season when choosing your theme. Incorporate seasonal
            elements for a more cohesive and natural feel.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="text-2xl mb-2">💡</div>
          <h3 className="font-semibold mb-2">Venue Compatibility</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Ensure your theme complements your venue's architecture and existing
            décor for a harmonious overall design.
          </p>
        </div>
      </div>

      {/* Theme Bot Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            AI Theme Assistant
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Chat with our AI assistant to get personalized theme suggestions based
            on your preferences and event type. Get color schemes, decoration ideas,
            and more!
          </p>
        </div>

        <ThemeBot />
      </div>

      {/* Additional Resources */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">Theme Planning Checklist</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>✓ Define your event's purpose and atmosphere</li>
              <li>✓ Consider your venue's existing style</li>
              <li>✓ Set a realistic decoration budget</li>
              <li>✓ Plan for lighting and ambiance</li>
              <li>✓ Consider seasonal availability of materials</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">Theme Implementation Tips</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>✓ Start with a mood board</li>
              <li>✓ Test your color combinations</li>
              <li>✓ Consider your guests' experience</li>
              <li>✓ Plan for photo opportunities</li>
              <li>✓ Include interactive elements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePage;