import { useState } from 'react';
import { Target, Users, Award, Briefcase, Plus, X } from 'lucide-react';
import MultiStepForm, { Step } from '@/components/poems/MultiStepForm';
import FormSection from '@/components/poems/FormSection';
import AnalysisPanel from '@/components/poems/AnalysisPanel';
import { Button } from '@/components/ui/button';
import { interventionRoles, interventionSkills, geographicAreas } from '@/data/mockData';

const steps: Step[] = [
  { id: 'step-1', label: 'Outcomes & Criteria', description: 'Define goals and beneficiaries' },
  { id: 'step-2', label: 'Offer Details', description: 'Requirements for beneficiaries' },
  { id: 'step-3', label: 'Timeframe & Funding', description: 'Schedule and budget' },
  { id: 'step-4', label: 'Display & Publishing', description: 'Visibility settings' },
];

interface Criterion {
  id: string;
  type: string;
  value: string;
}

export default function CreateIntervention() {
  const [currentStep, setCurrentStep] = useState(0);

  // Step 1 form data
  const [focusRoles, setFocusRoles] = useState<string[]>([]);
  const [aim, setAim] = useState<'increase' | 'decrease'>('increase');
  const [geographicArea, setGeographicArea] = useState('');

  const [payCriteria, setPayCriteria] = useState({ min: '', max: '' });
  const [reliabilityRank, setReliabilityRank] = useState('');
  const [utilizationThreshold, setUtilizationThreshold] = useState('');

  const [skillsCriteria, setSkillsCriteria] = useState<Criterion[]>([]);
  const [rolesCriteria, setRolesCriteria] = useState<Criterion[]>([]);

  // Calculate beneficiaries based on criteria
  const calculateBeneficiaries = () => {
    let count = geographicAreas.find((area) => area.value === geographicArea)?.beneficiaries || 8500;

    // Apply filters to reduce count
    if (focusRoles.length > 0) count = Math.floor(count * 0.6);
    if (payCriteria.min || payCriteria.max) count = Math.floor(count * 0.7);
    if (reliabilityRank) count = Math.floor(count * 0.5);
    if (skillsCriteria.length > 0) count = Math.floor(count * (0.9 ** skillsCriteria.length));
    if (rolesCriteria.length > 0) count = Math.floor(count * (0.85 ** rolesCriteria.length));

    return Math.max(50, count);
  };

  const beneficiariesCount = calculateBeneficiaries();
  const overlappingInterventions = beneficiariesCount > 1000 ? Math.floor(Math.random() * 5) + 3 : Math.floor(Math.random() * 3) + 1;

  const addSkillCriterion = () => {
    setSkillsCriteria([
      ...skillsCriteria,
      { id: `skill-${Date.now()}`, type: 'include', value: '' },
    ]);
  };

  const removeSkillCriterion = (id: string) => {
    setSkillsCriteria(skillsCriteria.filter((c) => c.id !== id));
  };

  const updateSkillCriterion = (id: string, field: 'type' | 'value', value: string) => {
    setSkillsCriteria(
      skillsCriteria.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const addRoleCriterion = () => {
    setRolesCriteria([
      ...rolesCriteria,
      { id: `role-${Date.now()}`, type: 'include', value: '' },
    ]);
  };

  const removeRoleCriterion = (id: string) => {
    setRolesCriteria(rolesCriteria.filter((c) => c.id !== id));
  };

  const updateRoleCriterion = (id: string, field: 'type' | 'value', value: string) => {
    setRolesCriteria(
      rolesCriteria.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Outcomes Sought */}
      <FormSection title="Outcomes Sought" description="Define the focus and goals of this intervention" icon={Target}>
        <div>
          <label className="block text-sm font-medium mb-2">Focus on which role(s)?</label>
          <select
            multiple
            value={focusRoles}
            onChange={(e) => setFocusRoles(Array.from(e.target.selectedOptions, (option) => option.value))}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px]"
          >
            {interventionRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground mt-1">Hold Ctrl/Cmd to select multiple</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Aim to:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="aim"
                value="increase"
                checked={aim === 'increase'}
                onChange={(e) => setAim(e.target.value as 'increase' | 'decrease')}
                className="w-4 h-4"
              />
              <span>Increase numbers in these roles</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="aim"
                value="decrease"
                checked={aim === 'decrease'}
                onChange={(e) => setAim(e.target.value as 'increase' | 'decrease')}
                className="w-4 h-4"
              />
              <span>Decrease numbers in these roles</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Geographic Area</label>
          <select
            value={geographicArea}
            onChange={(e) => setGeographicArea(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select area...</option>
            {geographicAreas.map((area) => (
              <option key={area.value} value={area.value}>
                {area.label} ({area.beneficiaries.toLocaleString()} workers)
              </option>
            ))}
          </select>
        </div>
      </FormSection>

      {/* Beneficiary Criteria */}
      <FormSection title="Beneficiary Criteria" description="Filter workers by their current status" icon={Users}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Min Pay Rate (£/hr)</label>
            <input
              type="number"
              value={payCriteria.min}
              onChange={(e) => setPayCriteria({ ...payCriteria, min: e.target.value })}
              placeholder="15"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Max Pay Rate (£/hr)</label>
            <input
              type="number"
              value={payCriteria.max}
              onChange={(e) => setPayCriteria({ ...payCriteria, max: e.target.value })}
              placeholder="30"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Reliability Rank</label>
          <select
            value={reliabilityRank}
            onChange={(e) => setReliabilityRank(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Any rank</option>
            <option value="1-2">Grade 1-2 (Exceptional/Excellent)</option>
            <option value="1-3">Grade 1-3 (Good or better)</option>
            <option value="1-4">Grade 1-4 (Fair or better)</option>
            <option value="5-6">Grade 5-6 (Needs improvement/New)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Utilization Threshold</label>
          <select
            value={utilizationThreshold}
            onChange={(e) => setUtilizationThreshold(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Any utilization</option>
            <option value="under-50">Under 50% (underutilized)</option>
            <option value="50-75">50-75% (moderate)</option>
            <option value="over-75">Over 75% (highly utilized)</option>
          </select>
        </div>
      </FormSection>

      {/* Skills Requirements */}
      <FormSection title="Skills Requirements" description="Include or exclude specific skills" icon={Award}>
        {skillsCriteria.map((criterion) => (
          <div key={criterion.id} className="flex gap-2 items-end">
            <div className="flex-1">
              <select
                value={criterion.type}
                onChange={(e) => updateSkillCriterion(criterion.id, 'type', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="include">Include</option>
                <option value="exclude">Exclude</option>
              </select>
            </div>
            <div className="flex-[2]">
              <select
                value={criterion.value}
                onChange={(e) => updateSkillCriterion(criterion.id, 'value', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select skill...</option>
                {interventionSkills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeSkillCriterion(criterion.id)} className="text-red-600">
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={addSkillCriterion} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Skill Criterion
        </Button>
      </FormSection>

      {/* Roles Requirements */}
      <FormSection title="Roles Requirements" description="Include or exclude specific roles" icon={Briefcase}>
        {rolesCriteria.map((criterion) => (
          <div key={criterion.id} className="flex gap-2 items-end">
            <div className="flex-1">
              <select
                value={criterion.type}
                onChange={(e) => updateRoleCriterion(criterion.id, 'type', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="include">Include</option>
                <option value="exclude">Exclude</option>
              </select>
            </div>
            <div className="flex-[2]">
              <select
                value={criterion.value}
                onChange={(e) => updateRoleCriterion(criterion.id, 'value', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select role...</option>
                {interventionRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeRoleCriterion(criterion.id)} className="text-red-600">
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={addRoleCriterion} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Role Criterion
        </Button>
      </FormSection>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderStep1();
      case 1:
        return (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <h2 className="text-2xl font-bold mb-2">Step 2: Offer Details</h2>
            <p className="text-muted-foreground">This step will define requirements for beneficiaries</p>
            <p className="text-sm text-muted-foreground mt-4">(Placeholder for prototype)</p>
          </div>
        );
      case 2:
        return (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <h2 className="text-2xl font-bold mb-2">Step 3: Timeframe & Funding</h2>
            <p className="text-muted-foreground">This step will define schedule and budget</p>
            <p className="text-sm text-muted-foreground mt-4">(Placeholder for prototype)</p>
          </div>
        );
      case 3:
        return (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <h2 className="text-2xl font-bold mb-2">Step 4: Display & Publishing</h2>
            <p className="text-muted-foreground">This step will define visibility settings</p>
            <p className="text-sm text-muted-foreground mt-4">(Placeholder for prototype)</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MultiStepForm
      steps={steps}
      currentStep={currentStep}
      onStepChange={setCurrentStep}
      onNext={() => setCurrentStep(currentStep + 1)}
      onPrevious={() => setCurrentStep(currentStep - 1)}
      onSubmit={() => console.log('Submit intervention')}
      canProceed={geographicArea !== ''}
      isLastStep={currentStep === steps.length - 1}
      sidePanel={
        <AnalysisPanel
          beneficiariesCount={beneficiariesCount}
          overlappingInterventions={overlappingInterventions}
          publicInterventions={Math.floor(overlappingInterventions / 2)}
          estimatedImpact={beneficiariesCount > 1000 ? 'High reach, moderate precision' : 'Moderate reach, high precision'}
          warnings={
            beneficiariesCount < 100
              ? ['Very narrow criteria may limit impact']
              : beneficiariesCount > 3000
                ? ['Very broad criteria may reduce targeting effectiveness']
                : []
          }
          suggestions={
            !reliabilityRank
              ? ['Consider adding reliability criteria to improve targeting']
              : skillsCriteria.length === 0
                ? ['Adding skill requirements could improve relevance']
                : []
          }
        />
      }
    >
      {renderStepContent()}
    </MultiStepForm>
  );
}
