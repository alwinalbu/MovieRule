const PendingApproval: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-yellow-600">Pending Approval</h1>
      <p className="mt-4 text-lg text-gray-600">
        Your theatre account is awaiting admin approval. You will be notified
        once it’s activated.
      </p>
    </div>
  );
};

export default PendingApproval;
